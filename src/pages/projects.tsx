import clsx from 'clsx';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import { HiGlobeAlt } from 'react-icons/hi';

import { trackEvent } from '@/lib/analytics';
import { sortByDate } from '@/lib/mdx.client';
import { getAllFilesFrontmatter } from '@/lib/mdx.server';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import ProjectCard from '@/components/content/projects/ProjectCard';
import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Mascot from '@/components/Mascot';
import Seo from '@/components/Seo';

type ProjectsPageProps = InferGetStaticPropsType<typeof getStaticProps> & {
  initialLang?: 'es' | 'en';
};

export default function ProjectsPage({
  projects,
  initialLang = 'es',
}: ProjectsPageProps) {
  const router = useRouter();
  const isLoaded = useLoaded();

  const [isSpanish, setisSpanish] = React.useState<boolean>(
    initialLang !== 'en'
  );

  React.useEffect(() => {
    if (router.asPath.startsWith('/en/projects') || router.query.lang === 'en') {
      setisSpanish(false);
    } else if (router.asPath.startsWith('/projects') && router.query.lang !== 'en') {
      setisSpanish(true);
    }
  }, [router.asPath, router.query.lang]);

  //#region  //*=========== Post Language Splitter ===========
  const spanishProjects = projects.filter((p) => !p.slug.startsWith('en-'));
  const englishProjects = projects.filter((p) => p.slug.startsWith('en-'));
  const currentProjects = isSpanish ? spanishProjects : englishProjects;
  //#endregion  //*======== Post Language Splitter ===========

  const targetLangHref = isSpanish ? '/en/projects' : '/projects';

  return (
    <Layout>
      <Seo
        templateTitle={isSpanish ? 'Proyectos' : 'Projects'}
        description={
          isSpanish
            ? 'Muestra de mis proyectos de datos, desarrollo e inteligencia artificial de los que estoy orgulloso'
            : 'Showcase of my production projects in AI Engineering, Multi-Agent Systems, Data Engineering, and C++.'
        }
        lang={isSpanish ? 'es' : 'en'}
        esUrl='https://www.pedromebo.com/projects'
        enUrl='https://www.pedromebo.com/en/projects'
      />

      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout py-12'>
            <div className='flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center'>
              <div className='flex-1'>
                <h1 className='text-3xl md:text-5xl' data-fade='0'>
                  <Accent>{isSpanish ? 'Proyectos' : 'Projects'}</Accent>
                </h1>
                <p data-fade='1' className='mt-2 text-[#586094] dark:text-[#b6bddb]'>
                  {isSpanish
                    ? 'Muestra de mis proyectos de datos, desarrollo e inteligencia artificial.'
                    : 'Showcase of my projects in data, software engineering, and artificial intelligence.'}
                </p>
              </div>
              <div data-fade='1' className='hidden sm:block shrink-0'>
                <Mascot pose='coding' mode='sticker' size='sm' className='max-w-[125px]' />
              </div>
            </div>

            <div
              className='relative z-10 mt-6 flex flex-col items-end gap-4 text-[#586094] dark:text-[#b6bddb] md:flex-row md:items-center md:justify-end'
              data-fade='4'
            >
              <UnstyledLink
                href={targetLangHref}
                onClick={() =>
                  trackEvent('Language Switch: Projects', { type: 'navigate' })
                }
                className='group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#596dff] bg-[#596dff]/15 px-3.5 py-1.5 font-mono text-xs font-bold leading-none text-[#3444ca] shadow-sm transition-all hover:scale-105 hover:bg-[#596dff] hover:text-white dark:border-[#00f5d4] dark:bg-[#00f5d4]/10 dark:text-[#00f5d4] dark:hover:bg-[#00f5d4] dark:hover:text-[#0a0d24]'
              >
                <HiGlobeAlt className='h-4 w-4 shrink-0 transition-transform duration-200 group-hover:rotate-45' />
                <span className='inline-flex items-center leading-none'>
                  {isSpanish ? 'Read in English 🇬🇧' : 'Leer en Español 🇪🇸'}
                </span>
                <span
                  aria-hidden='true'
                  className='shrink-0 transition-transform duration-200 group-hover:translate-x-0.5'
                >
                  &rarr;
                </span>
              </UnstyledLink>
            </div>

            <ul
              data-fade='2'
              className='mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
            >
              {currentProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = await getAllFilesFrontmatter('projects');
  const projects = sortByDate(files);

  return { props: { projects } };
}

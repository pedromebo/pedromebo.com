import clsx from 'clsx';
import { InferGetStaticPropsType } from 'next';
import * as React from 'react';

import { sortByDate } from '@/lib/mdx.client';
import { getAllFilesFrontmatter } from '@/lib/mdx.server';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import ProjectCard from '@/components/content/projects/ProjectCard';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Button from '@/components/buttons/Button';

export default function ProjectsPage({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isLoaded = useLoaded();

  const [isSpanish, setisSpanish] = React.useState<boolean>(true);

  //#region  //*=========== Post Language Splitter ===========
  const englishProjects = projects.filter((p) => !p.slug.startsWith('en-'));
  const spanishProjects = projects.filter((p) => p.slug.startsWith('en-'));
  const currentProjects = isSpanish ? englishProjects : spanishProjects;
  //#endregion  //*======== Post Language Splitter ===========

  return (
    <Layout>
      <Seo
        templateTitle='Projects'
        description="Muestra de mis proyectos de datos, desarrollo e inteligencia artificial de los que estoy orgulloso"
      />

      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout py-12'>
            <h1 className='text-3xl md:text-5xl' data-fade='0'>
              <Accent>{isSpanish ? 'Proyectos' : 'Projects'}</Accent>
            </h1>
            <p data-fade='1' className='mt-2 text-gray-600 dark:text-gray-300'>
              {isSpanish ? 'Muestra de mis proyectos de datos, desarrollo e inteligencia artificial.' : 'Showcase of my projects of data, development and artificial intelligence'}
            </p>
            <div
              className='relative z-10 mt-6 flex flex-col items-end gap-4 text-gray-600 dark:text-gray-300 md:flex-row md:items-center md:justify-between'
              data-fade='4'
            >
              <Button
                onClick={() => {
                  setisSpanish((b) => !b);
                }}
                className='text-sm !font-medium'
              >
                {isSpanish ? 'Read in English' : 'Leer en Español'}
              </Button>
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

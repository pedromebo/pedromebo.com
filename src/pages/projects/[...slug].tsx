import clsx from 'clsx';
import { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { ParsedUrlQuery } from 'querystring';
import * as React from 'react';
import { HiGlobeAlt, HiLink, HiPlay, HiUser } from 'react-icons/hi';
import { SiGithub } from 'react-icons/si';
import { MDXClient } from 'next-mdx-remote-client';
import { serialize } from 'next-mdx-remote-client/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

const LiteYouTubeEmbed = dynamic(
  () => import('react-lite-youtube-embed').then((mod) => mod.default),
  { ssr: false }
);

import { trackEvent } from '@/lib/analytics';
import { cleanPagePrefix } from '@/lib/helper.client';
import { getFileSlugArray, getFrontmatter } from '@/lib/mdx.server';
import useScrollSpy from '@/hooks/useScrollspy';

import MDXComponents from '@/components/content/MDXComponents';
import SubscribeCard from '@/components/content/blog/SubscribeCard';
import TableOfContents, {
  HeadingScrollSpy,
} from '@/components/content/TableOfContents';
import CloudinaryImg from '@/components/images/CloudinaryImg';
import Layout from '@/components/layout/Layout';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import CustomLink from '@/components/links/CustomLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

import { ProjectType } from '@/types/frontmatters';

type SingleProjectPageProps = {
  frontmatter: ProjectType['frontmatter'];
  mdxSource: any;
};

export default function SingleProjectPage({
  frontmatter,
  mdxSource,
}: SingleProjectPageProps) {
  //#region  //*=========== Link Constants ===========
  const isDirectBanner = frontmatter.banner.startsWith('/') || frontmatter.banner.startsWith('http');
  const bannerPublicId = isDirectBanner ? frontmatter.banner : `pedromebo/${frontmatter.banner}`;
  const OG_BANNER_LINK = isDirectBanner
    ? (frontmatter.banner.startsWith('http') ? frontmatter.banner : `https://www.pedromebo.com${frontmatter.banner}`)
    : `https://res.cloudinary.com/pedromebo/image/upload/f_auto,c_fill,g_center,w_1200,h_630/pedromebo/${frontmatter.banner}`;
  //#endregion  //*======== Link Constants ===========

  //#region  //*=========== Project Language ===========
  const cleanSlug = cleanPagePrefix(frontmatter.slug);
  const isSpanish = cleanSlug === frontmatter.slug;
  const targetSlug =
    frontmatter.translated_slug ?? (isSpanish ? `en-${cleanSlug}` : cleanSlug);
  //#endregion  //*======== Project Language ===========

  //#region  //*=========== Scrollspy ===========
  const activeSection = useScrollSpy();

  const [toc, setToc] = React.useState<HeadingScrollSpy>();
  const minLevel =
    toc?.reduce((min, item) => (item.level < min ? item.level : min), 10) ?? 0;

  React.useEffect(() => {
    const headings = document.querySelectorAll('.mdx h1, .mdx h2, .mdx h3');

    const headingArr: HeadingScrollSpy = [];
    headings.forEach((heading) => {
      const id = heading.id;
      const level = +heading.tagName.replace('H', '');
      const text = heading.textContent + '';

      headingArr.push({ id, level, text });
    });

    setToc(headingArr);
  }, [frontmatter.slug]);
  //#endregion  //*======== Scrollspy ===========

  //#region  //*=========== MDX Content Memoization ===========
  const mdxContent = React.useMemo(
    () => <MDXClient {...mdxSource} components={MDXComponents()} />,
    [mdxSource]
  );
  //#endregion  //*======== MDX Content Memoization ===========

  return (
    <Layout>
      <ReadingProgressBar />
      <Seo
        templateTitle={frontmatter.title}
        description={frontmatter.description}
        isProject
        date={new Date(frontmatter.publishedAt).toISOString()}
        dateModified={
          frontmatter.lastUpdated
            ? new Date(frontmatter.lastUpdated).toISOString()
            : undefined
        }
        banner={OG_BANNER_LINK}
        tags={frontmatter.techs}
        lang={isSpanish ? 'es' : 'en'}
        alternateUrl={
          !frontmatter?.spanishOnly ? `/projects/${targetSlug}` : undefined
        }
      />

      <main>
        <section className='min-w-0 max-w-full'>
          <div className='layout py-8'>
            <div className='relative overflow-hidden rounded-[20px] border border-[#cbcfe0] shadow-sm dark:border-[#262f6e] dark:bg-[#0a0d24]'>
              <CloudinaryImg
                publicId={bannerPublicId}
                alt={frontmatter.title}
                width={1440}
                height={792}
                className='w-full'
              />
            </div>

            <div className='mt-6 flex flex-wrap items-center justify-between gap-4'>
              <h1 className='text-2xl font-bold leading-tight text-[#111638] sm:text-3xl lg:text-4xl dark:text-white'>
                {frontmatter.title}
              </h1>

              {!frontmatter?.spanishOnly && (
                <UnstyledLink
                  href={`/projects/${targetSlug}`}
                  onClick={() =>
                    trackEvent(`Language Switch: ${frontmatter.slug}`, {
                      type: 'navigate',
                    })
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
              )}
            </div>

            <p className='mt-3 text-sm leading-relaxed text-[#586094] dark:text-[#b6bddb] sm:text-base'>
              {frontmatter.description}
            </p>

            <div className='mt-4 flex flex-wrap items-center gap-3 text-sm'>
              {frontmatter.github && (
                <UnstyledLink
                  onClick={() =>
                    trackEvent(`Project Github: ${frontmatter.title}`, {
                      type: 'link',
                    })
                  }
                  href={frontmatter.github}
                  className='inline-flex items-center gap-2 rounded-lg border border-[#cbcfe0] bg-white px-3 py-1.5 font-mono text-xs font-semibold leading-none text-[#111638] transition-colors hover:border-[#00f5d4] dark:border-[#262f6e] dark:bg-[#0a0d24] dark:text-white'
                >
                  <SiGithub className='shrink-0 text-base text-[#111638] dark:text-[#00f5d4]' />
                  <span>GitHub Repository</span>
                </UnstyledLink>
              )}
              {frontmatter.youtube && (
                <UnstyledLink
                  href={frontmatter.youtube}
                  className='inline-flex items-center gap-2 rounded-lg border border-[#cbcfe0] bg-white px-3 py-1.5 font-mono text-xs font-semibold leading-none text-[#111638] transition-colors hover:border-[#ff2e93] dark:border-[#262f6e] dark:bg-[#0a0d24] dark:text-white'
                  onClick={() =>
                    trackEvent(`Project Video: ${frontmatter.title}`, {
                      type: 'link',
                    })
                  }
                >
                  <HiPlay className='shrink-0 text-base text-[#ff2e93]' />
                  <span>Demo Video</span>
                </UnstyledLink>
              )}
              {frontmatter.link && (
                <UnstyledLink
                  href={frontmatter.link}
                  className='inline-flex items-center gap-2 rounded-lg border border-[#cbcfe0] bg-white px-3 py-1.5 font-mono text-xs font-semibold leading-none text-[#111638] transition-colors hover:border-[#596dff] dark:border-[#262f6e] dark:bg-[#0a0d24] dark:text-white'
                  onClick={() =>
                    trackEvent(`Project Live: ${frontmatter.title}`, {
                      type: 'link',
                    })
                  }
                >
                  <HiLink className='shrink-0 text-base text-[#596dff] dark:text-[#00f5d4]' />
                  <span>{isSpanish ? 'Visitar Proyecto' : 'Visit Project'}</span>
                </UnstyledLink>
              )}
              {frontmatter.category && (
                <span className='inline-flex items-center gap-1.5 rounded-lg border border-[#cbcfe0] bg-[#eff0f7] px-3 py-1.5 font-mono text-xs font-semibold leading-none text-[#586094] dark:border-[#262f6e] dark:bg-[#111638] dark:text-[#b6bddb]'>
                  <HiUser className='shrink-0 text-sm text-[#00f5d4]' />
                  <span>{frontmatter.category}</span>
                </span>
              )}
            </div>

            {/* Embedded YouTube Player if available */}
            {frontmatter.youtube && (
              <div className='mt-8 overflow-hidden rounded-2xl border border-[#cbcfe0] shadow-xl dark:border-[#262f6e]'>
                <LiteYouTubeEmbed
                  id={
                    frontmatter.youtube.match(
                      /(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*)/
                    )?.[1] ?? ''
                  }
                  title={frontmatter.title}
                  noCookie={true}
                />
              </div>
            )}

            <hr className='mt-6 border-[#cbcfe0] dark:border-[#262f6e]' />

            <section className='mt-6 min-w-0 max-w-full lg:grid lg:grid-cols-[auto_260px] lg:gap-10'>
              <article className='mdx projects prose mx-auto w-full min-w-0 max-w-full transition-colors dark:prose-invert'>
                {mdxContent}
              </article>

              <aside className='py-4'>
                <div className='sticky top-36'>
                  <TableOfContents
                    toc={toc}
                    minLevel={minLevel}
                    activeSection={activeSection}
                  />
                </div>
              </aside>
            </section>

            <SubscribeCard
              className='mt-12'
              lang={isSpanish ? 'es' : 'en'}
              title={
                isSpanish
                  ? '¿Quieres construir una arquitectura similar o tienes dudas sobre este proyecto?'
                  : 'Want to build a similar architecture or have questions about this project?'
              }
              description={
                isSpanish
                  ? 'Estoy disponible para consultoría técnica, diseño de sistemas de IA en producción y colaboraciones. Conectemos en X o LinkedIn.'
                  : 'I am available for technical consulting, production AI architecture design, and collaborations. Let’s connect on X or LinkedIn.'
              }
            />

            <div className='mt-8 flex flex-col items-start gap-4 md:flex-row md:justify-between'>
              <CustomLink href={isSpanish ? '/projects' : '/en/projects'}>
                {isSpanish ? '← Volver a proyectos' : '← Back to projects'}
              </CustomLink>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getFileSlugArray('projects');

  return {
    paths: posts.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
};

interface Params extends ParsedUrlQuery {
  slug: string[];
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as Params;
  const { frontmatter } = await getFrontmatter('projects', slug.join('/'));

  // Read and process the MDX file
  const filePath = `src/contents/projects/${slug.join('/')}.mdx`;
  const { readFile } = await import('node:fs/promises');
  const source = await readFile(filePath, 'utf8');

  const mdxSource = await serialize({
    source: source,
    options: {
      mdxOptions: {
        development: false,
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [
          [rehypePrettyCode, {
            theme: 'github-dark-dimmed',
            onVisitLine(node) {
              // Prevent lines from collapsing in `display: grid` mode, and
              // allow empty lines to be copy/pasted
              if (node.children.length === 0) {
                node.children = [{ type: 'text', value: ' ' }];
              }
            },
            onVisitHighlightedLine(node) {
              if (!node.properties.className) {
                node.properties.className = [];
              }
              node.properties.className.push('highlighted');
            },
            onVisitHighlightedWord(node, id) {
              if (!node.properties.className) {
                node.properties.className = [];
              }
              node.properties.className.push('word');
            }
          }],
          [rehypeSlug, {
            maintainCase: false,
            removeAccents: true
          }],
          rehypeKatex,
          [rehypeAutolinkHeadings, {
            properties: {
              className: ['hash-anchor']
            }
          }]
        ],
      },
      parseFrontmatter: true,
      scope: {},
    }
  });

  return {
    props: {
      frontmatter,
      mdxSource,
    },
  };
};

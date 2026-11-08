import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import * as React from 'react';
import { readFileSync } from 'fs';
import path from 'path';
import { HiGlobeAlt } from 'react-icons/hi';
import { MDXClient } from 'next-mdx-remote-client';
import { serialize } from 'next-mdx-remote-client/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import { trackEvent } from '@/lib/analytics';
import { getFileSlugArray, getFrontmatter } from '@/lib/mdx.server';
import useScrollSpy from '@/hooks/useScrollspy';

import MDXComponents from '@/components/content/MDXComponents';
import SubscribeCard from '@/components/content/blog/SubscribeCard';
import TableOfContents, {
  HeadingScrollSpy,
} from '@/components/content/TableOfContents';
import Tag from '@/components/content/Tag';
import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

import { LibraryType } from '@/types/frontmatters';

type SingleShortPageProps = {
  mdxSource: any;
  frontmatter: LibraryType['frontmatter'];
};

export default function SingleShortPage({ mdxSource, frontmatter }: SingleShortPageProps) {
  const isSpanish = !frontmatter.slug.startsWith('en-');
  const cleanSlug = frontmatter.slug.replace(/^en-/, '');
  const targetSlug =
    frontmatter.translated_slug ?? (isSpanish ? `en-${cleanSlug}` : cleanSlug);

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

  return (
    <Layout>
      <Seo
        templateTitle={frontmatter.title}
        description={frontmatter.description}
        isBlog
        tags={frontmatter.tags}
        lang={isSpanish ? 'es' : 'en'}
        alternateUrl={
          !frontmatter?.spanishOnly ? `/shorts/${targetSlug}` : undefined
        }
      />

      <main>
        <section className='min-w-0 max-w-full'>
          <div className='layout py-8'>
            <div className='border-b border-[#cbcfe0] pb-4 dark:border-[#262f6e]'>
              <div className='flex flex-wrap items-center justify-between gap-4'>
                <div className='flex flex-wrap gap-x-1.5 gap-y-1 text-sm text-[#111638] dark:text-white'>
                  {frontmatter.tags.split(',').map((tag) => (
                    <Tag
                      tabIndex={-1}
                      className='bg-opacity-80 dark:!bg-opacity-60'
                      key={tag}
                    >
                      #{tag.trim()}
                    </Tag>
                  ))}
                </div>

                {!frontmatter?.spanishOnly && (
                  <UnstyledLink
                    href={`/shorts/${targetSlug}`}
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

              <h1 className='mt-4 text-2xl font-bold leading-tight text-[#111638] sm:text-3xl dark:text-white'>
                {frontmatter.title}
              </h1>
              <p className='mt-2 text-sm text-[#586094] dark:text-[#b6bddb]'>
                {frontmatter.description}
              </p>
            </div>

            <section className='mt-6 min-w-0 max-w-full lg:grid lg:grid-cols-[auto_260px] lg:gap-10'>
              <article className='mdx prose mx-auto w-full min-w-0 max-w-full transition-colors dark:prose-invert'>
                <MDXClient {...mdxSource} components={MDXComponents()} />
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
                  ? '¿Qué opinas sobre esta reflexión o consejo técnico?'
                  : 'What are your thoughts on this technical note?'
              }
              description={
                isSpanish
                  ? 'Suelo compartir notas rápidas de ingeniería y debatir sobre el sector a diario. Charlamos en X o LinkedIn.'
                  : 'I regularly share quick engineering notes and discuss AI industry trends. Let’s chat on X or LinkedIn.'
              }
            />

            <div className='mt-8 flex flex-col items-start gap-4 md:flex-row md:justify-between'>
              <CustomLink href={isSpanish ? '/shorts' : '/en/shorts'}>
                {isSpanish ? '← Volver a shorts' : '← Back to shorts'}
              </CustomLink>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getFileSlugArray('library');

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
  const { frontmatter } = await getFrontmatter('library', slug.join('/'));

  // Read and process the MDX file
  const filePath = path.join(process.cwd(), 'src', 'contents', 'library', `${slug.join('/')}.mdx`);
  const mdxContent = readFileSync(filePath, 'utf8');

  const mdxSource = await serialize({
    source: mdxContent,
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

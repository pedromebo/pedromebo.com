import clsx from 'clsx';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import * as React from 'react';
import { HiLink, HiOutlineEye, HiPlay, HiUser } from 'react-icons/hi';
import { SiGithub } from 'react-icons/si';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { trackEvent } from '@/lib/analytics';
import { cleanPagePrefix } from '@/lib/helper.client';
import { getFileSlugArray, getFrontmatter } from '@/lib/mdx.server';
import useScrollSpy from '@/hooks/useScrollspy';

import MDXComponents from '@/components/content/MDXComponents';
import TableOfContents, {
  HeadingScrollSpy,
} from '@/components/content/TableOfContents';
import CloudinaryImg from '@/components/images/CloudinaryImg';
import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
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
  //#region  //*=========== Project Language ===========
  // TODO: add implementation, should be bugged if folder/es-slug.mdx
  const cleanSlug = cleanPagePrefix(frontmatter.slug);
  const isSpanish = cleanSlug === frontmatter.slug;
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

  return (
    <Layout>
      <Seo
        templateTitle={frontmatter.title}
        description={frontmatter.description}
        date={new Date(frontmatter.publishedAt).toISOString()}
      />

      <main>
        <section className=''>
          <div className='layout'>
            <CloudinaryImg
              publicId={`pedromebo/${frontmatter.banner}`}
              alt={frontmatter.title}
              width={1440}
              height={792}
            />

            <h1 className='mt-4'>{frontmatter.title}</h1>
            <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
              {frontmatter.description}
            </p>

            <div className='mt-2 flex flex-wrap items-center justify-start gap-3 text-sm font-medium text-gray-600 dark:text-gray-300'>
              {(frontmatter.github ||
                frontmatter.youtube ||
                frontmatter.link) &&
                ' - '}
              {frontmatter.github && (
                <div className='inline-flex items-center gap-2'>
                  <SiGithub className='text-lg text-gray-800 dark:text-white' />
                  <CustomLink
                    onClick={() =>
                      trackEvent(`Project Github: ${frontmatter.title}`, {
                        type: 'link',
                      })
                    }
                    href={frontmatter.github}
                    className='mt-1'
                  >
                    Repository
                  </CustomLink>
                </div>
              )}
              {frontmatter.github &&
                (frontmatter.youtube || frontmatter.link) &&
                ' - '}
              {frontmatter.youtube && (
                <div className='inline-flex items-center gap-2'>
                  <HiPlay className='text-xl text-gray-800 dark:text-white' />
                  <CustomLink
                    href={frontmatter.youtube}
                    className='mt-1'
                    onClick={() =>
                      trackEvent(`Project Video: ${frontmatter.title}`, {
                        type: 'link',
                      })
                    }
                  >
                    Demo Video
                  </CustomLink>
                </div>
              )}
              {frontmatter.youtube && frontmatter.link && ' - '}
              {frontmatter.link && (
                <div className='inline-flex items-center gap-2'>
                  <HiLink className='text-lg text-gray-800 dark:text-white' />
                  <CustomLink
                    href={frontmatter.link}
                    className='mt-1'
                    onClick={() =>
                      trackEvent(`Project Live: ${frontmatter.title}`, {
                        type: 'link',
                      })
                    }
                  >
                    Open Live Site
                  </CustomLink>
                </div>
              )}
            </div>
            {frontmatter.category && (
              <p className='mt-2 flex items-center justify-start gap-2 text-sm text-gray-600 dark:text-gray-300'>
                <HiUser className='text-lg text-gray-800 dark:text-white' />{' '}
                {frontmatter.category}
              </p>
            )}
            
            {!frontmatter?.spanishOnly && (
                <CustomLink
                  href={`/projects/${isSpanish ? 'en-' : ''}${cleanSlug}`}
                  className='mt-4'
                >
                  {isSpanish ? 'Read in English' : 'Leer en Español'}
                </CustomLink>
              )}

            <hr className='mt-4 dark:border-gray-600' />

            <section className='lg:grid lg:grid-cols-[auto,250px] lg:gap-8'>
              <article className='mdx projects prose mx-auto w-full transition-colors dark:prose-invert'>
                <MDXRemote {...mdxSource} components={MDXComponents} />
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

            <div className='mt-8 flex flex-col items-start gap-4 md:flex-row md:justify-between'>
              <CustomLink href='/projects'>← Back to projects</CustomLink>
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

  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypePrettyCode as any],
        [rehypeAutolinkHeadings, {
          properties: {
            className: ['hash-anchor']
          }
        }]
      ],
    },
    parseFrontmatter: true,
  });

  return {
    props: { 
      frontmatter,
      mdxSource,
    },
  };
};

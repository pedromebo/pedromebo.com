import clsx from 'clsx';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import * as React from 'react';
import { HiCalendar, HiGlobeAlt, HiOutlineClock } from 'react-icons/hi';
import { MDXClient } from 'next-mdx-remote-client';
import { serialize } from 'next-mdx-remote-client/serialize';
import { readFileSync } from 'fs';
import path from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';

import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import { trackEvent } from '@/lib/analytics';
import { cleanPagePrefix } from '@/lib/helper.client';
import { getFileSlugArray, getRecommendations, getFrontmatter } from '@/lib/mdx.server';
import useScrollSpy from '@/hooks/useScrollspy';

import Accent from '@/components/Accent';
import BlogCard from '@/components/content/blog/BlogCard';
import SubscribeCard from '@/components/content/blog/SubscribeCard';
import MDXComponents from '@/components/content/MDXComponents';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import ReloadDevtool from '@/components/content/ReloadDevtool';
import TableOfContents, {
  HeadingScrollSpy,
} from '@/components/content/TableOfContents';
import CloudinaryImg from '@/components/images/CloudinaryImg';
import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import ShareTweetButton from '@/components/links/ShareTweetButton';
import Seo from '@/components/Seo';

import { BlogFrontmatter } from '@/types/frontmatters';

type SingleBlogPageProps = {
  recommendations: BlogFrontmatter[];
  frontmatter: BlogFrontmatter;
  mdxSource: any;
};

export default function SingleBlogPage({
  frontmatter,
  recommendations,
  mdxSource,
}: SingleBlogPageProps) {
  //#region  //*=========== Link Constants ===========
  const OG_BANNER_LINK = `https://res.cloudinary.com/pedromebo/image/upload/f_auto,c_fill,g_center,w_1200,h_630/pedromebo/banner/${frontmatter.banner}`;
  //#endregion  //*======== Link Constants ===========

  //#region  //*=========== Blog Language ===========
  const translated_slug = frontmatter.translated_slug;
  const cleanSlug = cleanPagePrefix(translated_slug ?? frontmatter.slug);
  const isSpanish = cleanPagePrefix(frontmatter.slug) === frontmatter.slug;
  //#endregion  //*======== Blog Language ===========

  //#region  //*=========== Content Meta ===========
  const contentSlug = `b_${cleanSlug}`;
  //#endregion  //*======== Content Meta ===========

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

  const targetSlug =
    frontmatter.translated_slug ?? `${isSpanish ? 'en-' : ''}${cleanSlug}`;

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
        isBlog
        banner={OG_BANNER_LINK}
        date={new Date(frontmatter.publishedAt).toISOString()}
        dateModified={
          frontmatter.lastUpdated
            ? new Date(frontmatter.lastUpdated).toISOString()
            : undefined
        }
        canonical={frontmatter.repost}
        tags={frontmatter.tags}
        lang={isSpanish ? 'es' : 'en'}
        alternateUrl={
          !frontmatter?.spanishOnly ? `/blog/${targetSlug}` : undefined
        }
      />

      <main>
        <ReloadDevtool />
        <section className='pt-6 pb-12'>
          <div className='layout'>
            {/* Banner with Night City Frame */}
            <div className='relative overflow-hidden rounded-[20px] border border-[#cbcfe0] shadow-sm dark:border-[#262f6e] dark:bg-[#0a0d24]'>
              <CloudinaryImg
                noStyle
                className='w-full'
                publicId={`pedromebo/banner/${frontmatter.banner}`}
                alt={`${frontmatter.title}`}
                width={1200}
                height={(1200 * 2) / 5}
                aspect={{ height: 2, width: 5 }}
              />
            </div>

            <div className='pt-6 pb-4'>
              {/* Tags list & Language Switcher */}
              <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
                {frontmatter.tags && (
                  <div className='flex flex-wrap items-center gap-2'>
                    {frontmatter.tags.split(',').map((tag) => (
                      <span
                        key={tag}
                        className='rounded-md border border-[#00f5d4]/40 bg-[#00f5d4]/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#0f766e] dark:text-[#00f5d4]'
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {!frontmatter?.spanishOnly && (
                  <UnstyledLink
                    href={`/blog/${targetSlug}`}
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

              <h1 className='text-2xl font-bold leading-tight text-[#111638] sm:text-4xl lg:text-[40px] dark:text-white'>
                {frontmatter.title}
              </h1>

              {/* Meta bar */}
              <div className='mt-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#cbcfe0]/60 pb-4 dark:border-[#262f6e]'>
                <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#586094] sm:text-sm dark:text-[#b6bddb]'>
                  <div className='flex items-center gap-1.5'>
                    <HiCalendar className='text-base text-[#596dff] dark:text-[#00f5d4]' />
                    <span>
                      {format(
                        new Date(
                          frontmatter.lastUpdated ?? frontmatter.publishedAt
                        ),
                        isSpanish ? "dd 'de' MMMM, yyyy" : 'MMMM dd, yyyy',
                        isSpanish ? { locale: es } : undefined
                      )}
                    </span>
                  </div>

                  <span>•</span>

                  <div className='flex items-center gap-1.5'>
                    <HiOutlineClock className='text-base text-[#ff2e93]' />
                    <span className='font-mono font-medium text-[#111638] dark:text-white'>
                      {isSpanish
                        ? frontmatter.readingTime.text
                            .replace('min read', 'min de lectura')
                            .replace('read', 'lectura')
                        : frontmatter.readingTime.text}
                    </span>
                  </div>

                  <span>•</span>

                  <span className='font-mono text-xs font-semibold text-[#0f766e] dark:text-[#00f5d4]'>
                    Pedro Medinilla • AI Engineer
                  </span>
                </div>
              </div>
            </div>

            <section className='mt-4 min-w-0 max-w-full lg:grid lg:grid-cols-[auto_260px] lg:gap-10'>
              <article className='mdx prose mx-auto w-full min-w-0 max-w-full transition-colors dark:prose-invert'>
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

            <ShareTweetButton
              className='mt-12'
              url={`https://www.pedromebo.com/blog/${frontmatter.slug}`}
              title={frontmatter.title}
              lang={isSpanish ? 'es' : 'en'}
            />

            {recommendations.length > 0 && (
              <div className='mt-20'>
                <h2>
                  <Accent>
                    {isSpanish
                      ? 'Otros posts que podrían interesarte'
                      : 'Other posts that might interest you'}
                  </Accent>
                </h2>
                <ul className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                  {recommendations.map((post, i) => (
                    <BlogCard
                      onClick={() => {
                        trackEvent(post.slug, { type: 'recommend' });
                      }}
                      className={clsx({ 'hidden xl:block': i === 2 })}
                      key={post.slug}
                      post={post}
                    />
                  ))}
                </ul>
              </div>
            )}

            <SubscribeCard
              className='mt-12'
              lang={isSpanish ? 'es' : 'en'}
              title={
                isSpanish
                  ? '¿Tienes dudas o quieres debatir sobre este post?'
                  : 'Questions or thoughts about this post?'
              }
              description={
                isSpanish
                  ? 'Suelo compartir aprendizajes y responder dudas técnicas a diario. Conectemos en X o LinkedIn y comentamos el artículo.'
                  : 'I regularly share technical learnings and answer questions. Let’s connect on X or LinkedIn to discuss the post.'
              }
            />

            <div className='mt-8 flex flex-col items-start gap-4 md:flex-row md:justify-between'>
              <CustomLink href={isSpanish ? '/blog' : '/en/blog'}>
                {isSpanish ? '← Volver al blog' : '← Back to blog'}
              </CustomLink>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getFileSlugArray('blog');

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
  const { frontmatter } = await getFrontmatter('blog', slug.join('/'));
  const recommendations = await getRecommendations(slug.join('/'));

  // Read and process the MDX file
  const filePath = path.join(process.cwd(), 'src', 'contents', 'blog', `${slug.join('/')}.mdx`);
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
      recommendations,
      mdxSource,
    },
  };
};

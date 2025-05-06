import clsx from 'clsx';
import { format } from 'date-fns';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import * as React from 'react';
import { HiOutlineClock } from 'react-icons/hi';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { readFileSync } from 'fs';
import path from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { trackEvent } from '@/lib/analytics';
import { cleanPagePrefix } from '@/lib/helper.client';
import { getFileSlugArray, getRecommendations, getFrontmatter } from '@/lib/mdx.server';
import useScrollSpy from '@/hooks/useScrollspy';

import Accent from '@/components/Accent';
import BlogCard from '@/components/content/blog/BlogCard';
import SubscribeCard from '@/components/content/blog/SubscribeCard';
import MDXComponents from '@/components/content/MDXComponents';
import ReloadDevtool from '@/components/content/ReloadDevtool';
import TableOfContents, {
  HeadingScrollSpy,
} from '@/components/content/TableOfContents';
import CloudinaryImg from '@/components/images/CloudinaryImg';
import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
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
  const OG_BANNER_LINK = `https://res.cloudinary.com/pedromebo/image/upload/f_auto,g_auto,c_fill,ar_4:5,w_1200/pedromebo/banner/${frontmatter.banner}`;
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

  return (
    <Layout>
      <Seo
        templateTitle={frontmatter.title}
        description={frontmatter.description}
        isBlog
        banner={OG_BANNER_LINK}
        date={new Date(
          frontmatter.lastUpdated ?? frontmatter.publishedAt
        ).toISOString()}
        canonical={frontmatter.repost}
        tags={frontmatter.tags}
      />

      <main>
        <ReloadDevtool />
        <section className=''>
          <div className='layout'>
            <div className='pb-4 dark:border-gray-600'>
              <CloudinaryImg
                publicId={`pedromebo/banner/${frontmatter.banner}`}
                alt={`${frontmatter.banner}`}
                width={1200}
                height={(1200 * 2) / 5}
                aspect={{ height: 2, width: 5 }}
              />

              <h1 className='mt-4'>{frontmatter.title}</h1>

              <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
                Written on{' '}
                {format(new Date(frontmatter.publishedAt), 'MMMM dd, yyyy')} by
                Pedro Medinilla.
              </p>
              <div className='mt-6 flex items-center justify-start gap-2 text-sm font-medium text-gray-600 dark:text-gray-300'>
                <div className='flex items-center gap-1'>
                  <HiOutlineClock className='inline-block text-base' />
                  <Accent>{frontmatter.readingTime.text.replace('min read', 'min.')}</Accent>
                </div>
              </div>
              {!frontmatter?.spanishOnly && (
                <CustomLink
                  href={`/blog/${isSpanish ? 'en-' : ''}${cleanSlug}`}
                  className='mt-4'
                >
                  {isSpanish ? 'Read in English' : 'Leer en Español'}
                </CustomLink>
              )}
            </div>

            <hr className='dark:border-gray-600' />

            <section className='lg:grid lg:grid-cols-[auto,250px] lg:gap-8'>
              <article className='mdx prose mx-auto mt-4 w-full transition-colors dark:prose-invert'>
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

            <ShareTweetButton
              className='mt-12'
              url={`https://www.pedromebo.com/blog/${frontmatter.slug}`}
              title={frontmatter.title}
            />

            {recommendations.length > 0 && (
              <div className='mt-20'>
                <h2>
                  <Accent>Otros posts que podrían interesarte</Accent>
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

            <SubscribeCard className='mt-12' title='¿Disfrutando del post?' />

            <div className='mt-8 flex flex-col items-start gap-4 md:flex-row md:justify-between'>
              <CustomLink href='/projects'>← Back to blogs</CustomLink>
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

  const mdxSource = await serialize(mdxContent, {
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
      recommendations,
      mdxSource,
    },
  };
};

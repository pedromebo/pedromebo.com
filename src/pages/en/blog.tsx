import { InferGetStaticPropsType } from 'next';

import BlogIndexPage, { getStaticProps as getBlogStaticProps } from '@/pages/blog';

export default function EnglishBlogPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return <BlogIndexPage {...props} initialLang='en' />;
}

export const getStaticProps = getBlogStaticProps;

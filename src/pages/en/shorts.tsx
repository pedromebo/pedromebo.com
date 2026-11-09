import { InferGetStaticPropsType } from 'next';

import ShortsPage, { getStaticProps as getShortsStaticProps } from '@/pages/shorts/index';

export default function EnglishShortsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return <ShortsPage {...props} initialLang='en' />;
}

export const getStaticProps = getShortsStaticProps;

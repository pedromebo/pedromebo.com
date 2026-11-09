import { InferGetStaticPropsType } from 'next';

import IndexPage, { getStaticProps as getHomeStaticProps } from '@/pages/index';

export default function EnglishHomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return <IndexPage {...props} initialLang='en' />;
}

export const getStaticProps = getHomeStaticProps;


import { InferGetStaticPropsType } from 'next';

import ProjectsPage, { getStaticProps as getProjectsStaticProps } from '@/pages/projects';

export default function EnglishProjectsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return <ProjectsPage {...props} initialLang='en' />;
}

export const getStaticProps = getProjectsStaticProps;

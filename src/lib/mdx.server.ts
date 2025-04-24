import { promises, readFileSync } from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import readingTime from 'reading-time';

import { sortByDate } from '@/lib/mdx.client';

import {
  ContentType,
  Frontmatter,
  PickFrontmatter,
} from '@/types/frontmatters';

export async function getFileSlugArray(type: ContentType) {
  return getFileList(join(process.cwd(), 'src', 'contents', type)).then(
    (paths) =>
      paths.map((path) =>
        path
          .replace(join(process.cwd(), 'src', 'contents', type) + '/', '')
          .replace('.mdx', '')
          .split('/')
      )
  );
}

export async function getFrontmatter(type: ContentType, slug: string) {
  const source = slug
    ? readFileSync(
        join(process.cwd(), 'src', 'contents', type, `${slug}.mdx`),
        'utf8'
      )
    : readFileSync(
        join(process.cwd(), 'src', 'contents', `${type}.mdx`),
        'utf8'
      );

  const { data: frontmatter, content } = matter(source);

  return {
    frontmatter: {
      wordCount: content.split(/\s+/g).length,
      readingTime: readingTime(content),
      slug: slug || null,
      ...frontmatter,
    },
    content
  };
}

const getFileList = async (dirName: string) => {
  let files: string[] = [];
  const items = await promises.readdir(dirName, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      files = [...files, ...(await getFileList(`${dirName}/${item.name}`))];
    } else {
      files.push(`${dirName}/${item.name}`);
    }
  }

  return files;
};

export async function getAllFilesFrontmatter<T extends ContentType>(type: T) {
  const files = await getFileList(join(process.cwd(), 'src', 'contents', type));

  return files.reduce((allPosts: Array<PickFrontmatter<T>>, absolutePath) => {
    const source = readFileSync(absolutePath, 'utf8');
    const { data } = matter(source);

    const res = [
      {
        ...(data as PickFrontmatter<T>),
        slug: absolutePath
          .replace(join(process.cwd(), 'src', 'contents', type) + '/', '')
          .replace('.mdx', ''),
        readingTime: readingTime(source),
      },
      ...allPosts,
    ];
    return res;
  }, []);
}

export async function getRecommendations(currSlug: string) {
  const frontmatters = await getAllFilesFrontmatter('blog');

  // Get current frontmatter
  const currentFm = frontmatters.find((fm) => fm.slug === currSlug);

  // Remove currentFm and spanish Posts, then randomize order
  const otherFms = frontmatters
    .filter((fm) => !fm.slug.startsWith('en-') && fm.slug !== currSlug)
    .sort(() => Math.random() - 0.5);

  // Find with similar tags
  const _recommendations = otherFms.filter((op) =>
    op.tags.split(',').some((p) => currentFm?.tags.split(',').includes(p))
  );
  const recommendations = sortByDate(_recommendations);

  // Populate with random recommendations if not enough
  const threeRecommendations =
    recommendations.length >= 3
      ? recommendations
      : [
          ...recommendations,
          ...otherFms.filter(
            (fm) => !recommendations.some((r) => r.slug === fm.slug)
          ),
        ];

  // Only return first three
  return threeRecommendations.slice(0, 3);
}

/**
 * Get and order frontmatters by specified array
 */
export function getFeatured<T extends Frontmatter>(
  contents: Array<T>,
  features: string[]
) {
  // override as T because there is no typechecking on the features array
  return features.map(
    (feat) => contents.find((content) => content.slug === feat) as T
  );
}

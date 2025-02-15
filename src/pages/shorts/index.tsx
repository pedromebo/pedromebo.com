import clsx from 'clsx';
import { InferGetStaticPropsType } from 'next';
import * as React from 'react';
import { GiTechnoHeart } from 'react-icons/gi';
import { HiSortAscending } from 'react-icons/hi';

import { getTags, sortByTitle, sortTitleFn } from '@/lib/mdx.client';
import { getAllFilesFrontmatter } from '@/lib/mdx.server';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import ShortsCard from '@/components/content/card/ShortsCard';
import ContentPlaceholder from '@/components/content/ContentPlaceholder';
import Tag, { SkipNavTag } from '@/components/content/Tag';
import StyledInput from '@/components/form/StyledInput';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import SortListbox, { SortOption } from '@/components/SortListbox';

import { LibraryFrontmatter } from '@/types/frontmatters';
import Button from '@/components/buttons/Button';

const sortOptions: Array<SortOption> = [
  {
    id: 'name',
    name: 'Ordenar por nombre',
    icon: HiSortAscending,
  }
];

export default function ShortsPage({
  snippets,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [isSpanish, setisSpanish] = React.useState<boolean>(true);

  const [sortOrder, setSortOrder] = React.useState<SortOption>(sortOptions[0]);
  const isLoaded = useLoaded();

  //#region  //*=========== Search ===========
  const [search, setSearch] = React.useState<string>('');
  const [filtered, setFiltered] = React.useState<Array<LibraryFrontmatter>>(
    () => [...snippets]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  React.useEffect(() => {
    const results = snippets.filter(
      (snippet) =>
        snippet.title.toLowerCase().includes(search.toLowerCase()) ||
        snippet.description.toLowerCase().includes(search.toLowerCase()) ||
        // Check if splitted search contained in tag
        search
          .toLowerCase()
          .split(' ')
          .every((tag) => snippet.tags.includes(tag))
    );

    if (sortOrder.id === 'date') {
      results.sort(sortTitleFn);
    }

    setFiltered(results);
  }, [snippets, search, sortOrder.id]);
  //#endregion  //*======== Search ===========

  const englishPosts = filtered.filter((p) => !p.slug.startsWith('en-'));
  const spanishPosts = filtered.filter((p) => p.slug.startsWith('en-'));
  const currentPosts = isSpanish ? englishPosts : spanishPosts;
  

  //#region  //*=========== Tag ===========
  const toggleTag = (tag: string) => {
    // If tag is already there, then remove
    if (search.includes(tag)) {
      setSearch((s) =>
        s
          .split(' ')
          .filter((t) => t !== tag)
          ?.join(' ')
      );
    } else {
      // append tag
      setSearch((s) => (s !== '' ? `${s.trim()} ${tag}` : tag));
    }
  };

  /** Currently available tags based on filtered library */
  const filteredTags = getTags(currentPosts);

  /** Show accent if not disabled and selected  */
  const checkTagged = (tag: string) => {
    return (
      filteredTags.includes(tag) &&
      search.toLowerCase().split(' ').includes(tag)
    );
  };
  //#endregion  //*======== Tag ===========

  return (
    <Layout>
      <Seo
        templateTitle='Shorts'
        description="Mini artículos o micro publicaciones. Suelen ser consejos rápidos sobre código, desarrollo o reflexiones"
      />

      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout py-12'>
            <h1 className='text-3xl md:text-5xl' data-fade='0'>
              <Accent>Shorts</Accent>
            </h1>
            <p className='mt-2 text-gray-600 dark:text-gray-300' data-fade='1'>
              {isSpanish ? 'Mini artículos o micro publicaciones. Suelen ser consejos rápidos sobre código, desarrollo o reflexiones.' : 'Mini blog or micro posts. Usually you will find tips about code, development and reflections.'}
            </p>
            <StyledInput
              data-fade='2'
              className='mt-4'
              placeholder='Search...'
              onChange={handleSearch}
              value={search}
              type='text'
            />
            <div
              className='mt-2 flex flex-wrap items-baseline justify-start gap-2 text-sm text-gray-600 dark:text-gray-300'
              data-fade='3'
            >
              <span className='font-medium'>{isSpanish ? 'Elige un tema' : 'Choose a topic'}:</span>
              <SkipNavTag>
                {filteredTags.map((tag) => (
                  <Tag
                    key={tag}
                    onClick={() => toggleTag(tag)}
                  >
                    {checkTagged(tag) ? <Accent>{tag}</Accent> : tag}
                  </Tag>
                ))}
              </SkipNavTag>
            </div>
            <div
              className='relative z-10 mt-6 flex flex-col items-end gap-4 text-gray-600 dark:text-gray-300 md:flex-row md:items-center md:justify-between'
              data-fade='4'
            >
              <Button
                onClick={() => {
                  setisSpanish((b) => !b);
                }}
                className='text-sm !font-medium'
              >
                {isSpanish ? 'Read in English' : 'Leer en Español'}
              </Button>
            </div>
            <div
              className='relative z-10 mt-4 flex flex-col items-end gap-4 text-gray-600 dark:text-gray-300 md:mt-8'
              data-fade='4'
            >
              <SortListbox
                selected={sortOrder}
                setSelected={setSortOrder}
                options={sortOptions}
              />
            </div>

            <ul
              className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
              data-fade='5'
            >
              {currentPosts.length > 0 ? (
                currentPosts.map((snippet) => (
                  <ShortsCard
                    key={snippet.slug}
                    short={snippet}
                    checkTagged={checkTagged}
                  />
                ))
              ) : (
                <ContentPlaceholder />
              )}
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = await getAllFilesFrontmatter('library');
  const snippets = sortByTitle(files);

  // Accumulate tags and remove duplicate
  const tags = getTags(snippets);

  return { props: { snippets, tags } };
}

import clsx from 'clsx';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import { HiGlobeAlt, HiSortAscending } from 'react-icons/hi';

import { trackEvent } from '@/lib/analytics';
import { getTags, sortByTitle, sortTitleFn } from '@/lib/mdx.client';
import { getAllFilesFrontmatter } from '@/lib/mdx.server';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import ShortsCard from '@/components/content/card/ShortsCard';
import Tag, { SkipNavTag } from '@/components/content/Tag';
import StyledInput from '@/components/form/StyledInput';
import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Mascot from '@/components/Mascot';
import Seo from '@/components/Seo';
import SortListbox, { SortOption } from '@/components/SortListbox';

import { LibraryFrontmatter } from '@/types/frontmatters';

const sortOptionsEs: Array<SortOption> = [
  {
    id: 'name',
    name: 'Ordenar por nombre',
    icon: HiSortAscending,
  },
];

const sortOptionsEn: Array<SortOption> = [
  {
    id: 'name',
    name: 'Sort by name',
    icon: HiSortAscending,
  },
];

type ShortsPageProps = InferGetStaticPropsType<typeof getStaticProps> & {
  initialLang?: 'es' | 'en';
};

export default function ShortsPage({
  snippets,
  tags,
  initialLang = 'es',
}: ShortsPageProps) {
  const router = useRouter();
  const [isSpanish, setisSpanish] = React.useState<boolean>(
    initialLang !== 'en'
  );
  const sortOptions = isSpanish ? sortOptionsEs : sortOptionsEn;

  const [sortOrder, setSortOrder] = React.useState<SortOption>(sortOptions[0]);
  const isLoaded = useLoaded();

  React.useEffect(() => {
    if (router.asPath.startsWith('/en/shorts') || router.query.lang === 'en') {
      setisSpanish(false);
    } else if (router.asPath.startsWith('/shorts') && router.query.lang !== 'en') {
      setisSpanish(true);
    }
  }, [router.asPath, router.query.lang]);

  React.useEffect(() => {
    setSortOrder(isSpanish ? sortOptionsEs[0] : sortOptionsEn[0]);
  }, [isSpanish]);

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

    if (sortOrder.id === 'name') {
      results.sort(sortTitleFn);
    }

    setFiltered(results);
  }, [snippets, search, sortOrder.id]);
  //#endregion  //*======== Search ===========

  const spanishPosts = filtered.filter((p) => !p.slug.startsWith('en-'));
  const englishPosts = filtered.filter((p) => p.slug.startsWith('en-'));
  const currentPosts = isSpanish ? spanishPosts : englishPosts;
  

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

  const targetLangHref = isSpanish ? '/en/shorts' : '/shorts';

  return (
    <Layout>
      <Seo
        templateTitle={isSpanish ? 'Shorts' : 'Shorts (English)'}
        description={
          isSpanish
            ? 'Mini artículos o micro publicaciones. Suelen ser consejos rápidos sobre código, desarrollo o reflexiones'
            : 'Micro-posts, code snippets, and quick engineering notes about AI and software development.'
        }
        lang={isSpanish ? 'es' : 'en'}
        esUrl='https://www.pedromebo.com/shorts'
        enUrl='https://www.pedromebo.com/en/shorts'
      />

      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout py-12'>
            <div className='flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center'>
              <div className='flex-1'>
                <h1 className='text-3xl md:text-5xl' data-fade='0'>
                  <Accent>Shorts</Accent>
                </h1>
                <p className='mt-2 text-[#586094] dark:text-[#b6bddb]' data-fade='1'>
                  {isSpanish ? 'Mini artículos o micro publicaciones. Suelen ser consejos rápidos sobre código, desarrollo o reflexiones.' : 'Mini blog or micro posts. Usually you will find tips about code, development and reflections.'}
                </p>
              </div>
              <div data-fade='1' className='hidden sm:block shrink-0'>
                <Mascot pose='thinking' mode='sticker' size='sm' className='max-w-[120px]' />
              </div>
            </div>
            <StyledInput
              data-fade='2'
              className='mt-4'
              placeholder={
                isSpanish
                  ? 'Buscar shorts, conceptos o tags...'
                  : 'Search shorts, concepts or tags...'
              }
              onChange={handleSearch}
              value={search}
              type='text'
            />
            <div
              className='mt-3 flex flex-wrap items-baseline justify-start gap-2 text-sm text-[#586094] dark:text-[#b6bddb]'
              data-fade='3'
            >
              <span className='font-medium text-[#111638] dark:text-white'>{isSpanish ? 'Elige un tema' : 'Choose a topic'}:</span>
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
              className='relative z-10 mt-6 flex flex-col items-end gap-4 text-[#586094] dark:text-[#b6bddb] md:flex-row md:items-center md:justify-end'
              data-fade='4'
            >
              <UnstyledLink
                href={targetLangHref}
                onClick={() =>
                  trackEvent('Language Switch: Shorts', { type: 'navigate' })
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
            </div>
            <div
              className='relative z-10 mt-4 flex flex-col items-end gap-4 text-[#586094] dark:text-[#b6bddb] md:mt-8'
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
                <div className='col-span-full flex flex-col items-center justify-center py-12 text-center'>
                  <Mascot pose='search' mode='sticker' size='xs' className='mb-3 max-w-[100px]' />
                  <p className='font-mono text-sm text-[#586094] dark:text-[#b6bddb]'>
                    {isSpanish ? 'No se encontraron shorts con esa búsqueda' : 'No shorts found with that search'}
                  </p>
                </div>
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

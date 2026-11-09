import clsx from 'clsx';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import { HiCalendar, HiGlobeAlt, HiSortAscending } from 'react-icons/hi';

import { trackEvent } from '@/lib/analytics';
import { getFromSessionStorage } from '@/lib/helper.client';
import { getTags, sortByDate, sortDateFn, sortTitleFn } from '@/lib/mdx.client';
import { getAllFilesFrontmatter } from '@/lib/mdx.server';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import BlogCard from '@/components/content/blog/BlogCard';
import SubscribeCard from '@/components/content/blog/SubscribeCard';
import Tag, { SkipNavTag } from '@/components/content/Tag';
import StyledInput from '@/components/form/StyledInput';
import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Mascot from '@/components/Mascot';
import Seo from '@/components/Seo';
import SortListbox, { SortOption } from '@/components/SortListbox';

import { BlogFrontmatter, InjectedMeta } from '@/types/frontmatters';

const sortOptionsEs: Array<SortOption> = [
  {
    id: 'date',
    name: 'Más recientes primero',
    icon: HiCalendar,
  },
  {
    id: 'name',
    name: 'Ordenar por título',
    icon: HiSortAscending,
  },
];

const sortOptionsEn: Array<SortOption> = [
  {
    id: 'date',
    name: 'Most recent first',
    icon: HiCalendar,
  },
  {
    id: 'name',
    name: 'Sort by title',
    icon: HiSortAscending,
  },
];

type BlogIndexPageProps = InferGetStaticPropsType<typeof getStaticProps> & {
  initialLang?: 'es' | 'en';
};

export default function IndexPage({
  posts,
  tags,
  initialLang = 'es',
}: BlogIndexPageProps) {
  const router = useRouter();
  const [isSpanish, setisSpanish] = React.useState<boolean>(
    initialLang !== 'en'
  );
  const sortOptions = isSpanish ? sortOptionsEs : sortOptionsEn;
  /** Lazy init from session storage to preserve preference on revisit */
  const [sortOrder, setSortOrder] = React.useState<SortOption>(
    () => sortOptions[Number(getFromSessionStorage('blog-sort')) || 0]
  );
  const isLoaded = useLoaded();

  React.useEffect(() => {
    if (router.asPath.startsWith('/en/blog') || router.query.lang === 'en') {
      setisSpanish(false);
    } else if (router.asPath.startsWith('/blog') && router.query.lang !== 'en') {
      setisSpanish(true);
    }
  }, [router.asPath, router.query.lang]);

  React.useEffect(() => {
    setSortOrder((prev) =>
      (isSpanish ? sortOptionsEs : sortOptionsEn).find(
        (o) => o.id === prev.id
      ) || (isSpanish ? sortOptionsEs[0] : sortOptionsEn[0])
    );
  }, [isSpanish]);

  //#region  //*=========== Search ===========
  const [search, setSearch] = React.useState<string>('');
  const [filteredPosts, setFilteredPosts] = React.useState<
    Array<BlogFrontmatter & InjectedMeta>
  >(() => [...posts]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const clearSearch = () => setSearch('');

  React.useEffect(() => {
    const results = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase()) ||
        // Check if splitted search contained in tag
        search
          .toLowerCase()
          .split(' ')
          .every((tag) => post.tags.includes(tag))
    );

    if (sortOrder.id === 'date') {
      results.sort(sortDateFn);
      sessionStorage.setItem('blog-sort', '0');
    } else if (sortOrder.id === 'name') {
      results.sort(sortTitleFn);
      sessionStorage.setItem('blog-sort', '1');
    }

    setFilteredPosts(results);
  }, [search, sortOrder.id, posts]);
  //#endregion  //*======== Search ===========

  //#region  //*=========== Post Language Splitter ===========
  const spanishPosts = filteredPosts.filter((p) => !p.slug.startsWith('en-'));
  const englishPosts = filteredPosts.filter((p) => p.slug.startsWith('en-'));
  const currentPosts = isSpanish ? spanishPosts : englishPosts;
  //#endregion  //*======== Post Language Splitter ===========

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

  /** Currently available tags based on filtered posts */
  const filteredTags = getTags(currentPosts);

  /** Show accent if not disabled and selected  */
  const checkTagged = (tag: string) => {
    return (
      filteredTags.includes(tag) &&
      search.toLowerCase().split(' ').includes(tag)
    );
  };
  //#endregion  //*======== Tag ===========

  const targetLangHref = isSpanish ? '/en/blog' : '/blog';

  return (
    <Layout>
      <Seo
        templateTitle={isSpanish ? 'Blog' : 'Blog (English)'}
        description={
          isSpanish
            ? 'Pensamientos, noticias y tutoriales sobre datos e inteligencia artificial. Rediseña tu forma de enfrentarte a problemas de desarrollo y aprende nuevos conceptos del mundo de los datos y la IA.'
            : 'Articles, architectural breakdowns, and tutorials about AI Engineering, Multi-Agent Systems, LLMs, and Data Engineering.'
        }
        lang={isSpanish ? 'es' : 'en'}
        esUrl='https://www.pedromebo.com/blog'
        enUrl='https://www.pedromebo.com/en/blog'
      />

      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout py-12'>
            <div className='flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center'>
              <div className='flex-1'>
                <h1 className='text-3xl md:text-5xl' data-fade='0'>
                  <Accent>Blog {!isSpanish && 'English'}</Accent>
                </h1>
                <p className='mt-2 text-[#586094] dark:text-[#b6bddb]' data-fade='1'>
                  {isSpanish ? 'Pensamientos, noticias y tutoriales sobre datos e inteligencia artificial.' : 'Thoughts, news and tutorials about data and artificial intelligence.'}
                </p>
              </div>
              <div data-fade='1' className='hidden sm:block shrink-0'>
                <Mascot pose='reading' mode='sticker' size='sm' className='max-w-[120px]' />
              </div>
            </div>
            <StyledInput
              data-fade='2'
              className='mt-4'
              placeholder={isSpanish ? 'Buscar artículos, conceptos o tags...' : 'Search articles, concepts or tags...'}
              onChange={handleSearch}
              value={search}
              type='text'
            />
            <div
              className='mt-3 flex flex-wrap items-baseline justify-start gap-2 text-sm text-[#586094] dark:text-[#b6bddb]'
              data-fade='3'
            >
              <span className='font-medium text-[#111638] dark:text-white'>
                {isSpanish ? 'Elige un tema:' : 'Choose a topic:'}
              </span>
              <SkipNavTag>
                {tags.map((tag) => (
                  <Tag
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    disabled={!filteredTags.includes(tag)}
                    active={checkTagged(tag)}
                  >
                    #{tag}
                  </Tag>
                ))}
              </SkipNavTag>
            </div>
            <div
              className='relative z-10 mt-6 flex flex-col items-end gap-4 text-[#586094] dark:text-[#b6bddb] md:flex-row md:items-center md:justify-between'
              data-fade='4'
            >
              <UnstyledLink
                href={targetLangHref}
                onClick={() => {
                  clearSearch();
                  trackEvent('Language Switch: Blog', { type: 'navigate' });
                }}
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
                currentPosts.map((post) => (
                  <BlogCard
                    key={post.slug}
                    post={post}
                    checkTagged={checkTagged}
                  />
                ))
              ) : (
                <div className='col-span-full flex flex-col items-center justify-center py-12 text-center'>
                  <Mascot pose='search' mode='sticker' size='xs' className='mb-3 max-w-[100px]' />
                  <p className='font-mono text-sm text-[#586094] dark:text-[#b6bddb]'>
                    {isSpanish ? 'No se encontraron publicaciones con esa búsqueda' : 'No posts found with that search'}
                  </p>
                </div>
              )}
            </ul>
            <SubscribeCard className='mt-8' />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = await getAllFilesFrontmatter('blog');
  const posts = sortByDate(files);

  // Accumulate tags and remove duplicate
  const tags = getTags(posts);

  return { props: { posts, tags } };
}

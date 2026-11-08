import Head from 'next/head';
import { useRouter } from 'next/router';

import { openGraph } from '@/lib/helper.client';

const defaultMeta = {
  title:
    'Pedro Medinilla Bohórquez (pedromebo) | AI Engineer — LLMs, Agentes e IA en Producción',
  siteName: 'Pedro Medinilla Bohórquez - Pedromebo',
  description:
    'AI Engineer especializado en sistemas multiagente, capas semánticas, RAG avanzado y LLMs en producción. Arquitecturas, optimizaciones y proyectos reales.',
  url: 'https://www.pedromebo.com',
  image: 'https://www.pedromebo.com/favicon/large-og.jpg',
  type: 'website',
  robots: 'follow, index',
};

type SeoProps = {
  date?: string;
  dateModified?: string;
  templateTitle?: string;
  isBlog?: boolean;
  isProject?: boolean;
  banner?: string;
  canonical?: string;
  tags?: string;
  lang?: 'es' | 'en';
  alternateUrl?: string;
  esUrl?: string;
  enUrl?: string;
} & Partial<typeof defaultMeta>;

const PERSON_SCHEMA = {
  '@type': 'Person',
  '@id': 'https://www.pedromebo.com/#person',
  name: 'Pedro Medinilla Bohórquez',
  alternateName: 'pedromebo',
  jobTitle: 'AI Engineer',
  url: 'https://www.pedromebo.com',
  image: 'https://www.pedromebo.com/images/mascot-pedromebo.png',
  sameAs: [
    'https://www.linkedin.com/in/pedromebo/',
    'https://twitter.com/pedromebo',
    'https://github.com/pedromebo',
  ],
  knowsAbout: [
    'Artificial Intelligence',
    'Large Language Models (LLMs)',
    'Multi-Agent Systems',
    'Semantic Layers',
    'Retrieval-Augmented Generation (RAG)',
    'LLMOps',
    'Data Engineering',
    'Python',
    'AWS',
  ],
};

export default function Seo(props: SeoProps) {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };
  meta['title'] = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title;

  // Clean path without query strings or hash fragments
  const rawPath = (router.asPath || '/').split('?')[0].split('#')[0];
  const cleanPath = rawPath === '/' ? '' : rawPath.replace(/\/$/, '');
  const currentCanonical = meta.canonical
    ? meta.canonical
    : `${meta.url}${cleanPath}`;

  // Detect language from prop or route
  const isEnglish =
    props.lang === 'en' ||
    (!props.lang &&
      (cleanPath.includes('/en-') ||
        cleanPath.startsWith('/en/') ||
        cleanPath === '/en'));
  const activeLang: 'es' | 'en' = isEnglish ? 'en' : 'es';
  const inLanguageCode = activeLang === 'en' ? 'en-US' : 'es-ES';
  const ogLocale = activeLang === 'en' ? 'en_US' : 'es_ES';
  const ogAlternateLocale = activeLang === 'en' ? 'es_ES' : 'en_US';

  // Resolve hreflang URLs if bilingual pair exists
  const resolvedEsUrl =
    props.esUrl ??
    (activeLang === 'es'
      ? currentCanonical
      : props.alternateUrl
      ? props.alternateUrl.startsWith('http')
        ? props.alternateUrl
        : `${meta.url}${props.alternateUrl}`
      : undefined);

  const resolvedEnUrl =
    props.enUrl ??
    (activeLang === 'en'
      ? currentCanonical
      : props.alternateUrl
      ? props.alternateUrl.startsWith('http')
        ? props.alternateUrl
        : `${meta.url}${props.alternateUrl}`
      : undefined);

  const hasHreflangPair = Boolean(resolvedEsUrl && resolvedEnUrl);

  // Use siteName if there is templateTitle
  // but show full title if there is none
  meta.image = openGraph({
    description: meta.description,
    siteName: props.templateTitle ? meta.siteName : meta.title,
    templateTitle: props.templateTitle,
    banner: props.banner,
    isBlog: props.isBlog,
    tags: props.tags,
  });

  // Build BreadcrumbList schema
  const pathSegments = cleanPath.split('/').filter(Boolean);
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: activeLang === 'en' ? 'Home' : 'Inicio',
      item: meta.url,
    },
    ...pathSegments.map((seg, idx) => {
      const segUrl = `${meta.url}/${pathSegments.slice(0, idx + 1).join('/')}`;
      const isLast = idx === pathSegments.length - 1;
      const label =
        isLast && props.templateTitle
          ? props.templateTitle
          : seg.charAt(0).toUpperCase() + seg.slice(1);
      return {
        '@type': 'ListItem',
        position: idx + 2,
        name: label,
        item: segUrl,
      };
    }),
  ];

  const graphEntities: Record<string, unknown>[] = [
    PERSON_SCHEMA,
    {
      '@type': 'WebSite',
      '@id': 'https://www.pedromebo.com/#website',
      url: meta.url,
      name: meta.siteName,
      description: defaultMeta.description,
      inLanguage: ['es-ES', 'en-US'],
      publisher: { '@id': 'https://www.pedromebo.com/#person' },
    },
  ];

  if (breadcrumbItems.length > 1) {
    graphEntities.push({
      '@type': 'BreadcrumbList',
      '@id': `${currentCanonical}#breadcrumb`,
      itemListElement: breadcrumbItems,
    });
  }

  if (cleanPath === '/about' || cleanPath === '/en/about') {
    graphEntities.push({
      '@type': 'ProfilePage',
      '@id': `${currentCanonical}#profilepage`,
      url: currentCanonical,
      name: meta.title,
      description: meta.description,
      inLanguage: inLanguageCode,
      mainEntity: { '@id': 'https://www.pedromebo.com/#person' },
    });
  }

  if (meta.isBlog || meta.isProject) {
    graphEntities.push({
      '@type': meta.isProject ? 'TechArticle' : 'BlogPosting',
      '@id': `${currentCanonical}#article`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': currentCanonical,
      },
      headline: props.templateTitle ?? meta.title,
      description: meta.description,
      image: meta.image,
      author: { '@id': 'https://www.pedromebo.com/#person' },
      publisher: { '@id': 'https://www.pedromebo.com/#person' },
      inLanguage: inLanguageCode,
      ...(meta.date ? { datePublished: meta.date } : {}),
      ...(meta.dateModified || meta.date
        ? { dateModified: meta.dateModified ?? meta.date }
        : {}),
      ...(meta.tags ? { keywords: meta.tags } : {}),
    });
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': graphEntities,
  };

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='robots' content={meta.robots} />
      <meta content={meta.description} name='description' />
      <meta property='og:url' content={currentCanonical} />
      <link rel='canonical' href={currentCanonical} />

      {/* Hreflang Internationalization */}
      {hasHreflangPair && (
        <>
          <link rel='alternate' hrefLang='es' href={resolvedEsUrl} />
          <link rel='alternate' hrefLang='en' href={resolvedEnUrl} />
          <link rel='alternate' hrefLang='x-default' href={resolvedEsUrl} />
        </>
      )}

      {/* Open Graph */}
      <meta property='og:type' content={meta.isBlog || meta.isProject ? 'article' : meta.type} />
      <meta property='og:site_name' content={meta.siteName} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      <meta name='image' property='og:image' content={meta.image} />
      <meta property='og:locale' content={ogLocale} />
      {hasHreflangPair && (
        <meta property='og:locale:alternate' content={ogAlternateLocale} />
      )}
      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@pedromebo' />
      <meta name='twitter:title' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.image} />
      {meta.date && (
        <>
          <meta property='article:published_time' content={meta.date} />
          <meta
            name='publish_date'
            property='og:publish_date'
            content={meta.date}
          />
          {meta.dateModified && (
            <meta
              property='article:modified_time'
              content={meta.dateModified}
            />
          )}
          <meta
            name='author'
            property='article:author'
            content='Pedro Medinilla Bohórquez'
          />
        </>
      )}
      <script
        key='structured-data'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Favicons */}
      {favicons.map((linkProps) => (
        <link key={linkProps.href} {...linkProps} />
      ))}
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta
        name='msapplication-TileImage'
        content='/favicon/ms-icon-144x144.png'
      />
      <meta name='theme-color' content='#ffffff' />
    </Head>
  );
}

type Favicons = {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
};

const favicons: Array<Favicons> = [
  {
    rel: 'apple-touch-icon',
    sizes: '57x57',
    href: '/favicon/apple-icon-57x57.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '60x60',
    href: '/favicon/apple-icon-60x60.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '72x72',
    href: '/favicon/apple-icon-72x72.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '76x76',
    href: '/favicon/apple-icon-76x76.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '114x114',
    href: '/favicon/apple-icon-114x114.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '120x120',
    href: '/favicon/apple-icon-120x120.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '144x144',
    href: '/favicon/apple-icon-144x144.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '152x152',
    href: '/favicon/apple-icon-152x152.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/favicon/apple-icon-180x180.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '192x192',
    href: '/favicon/android-icon-192x192.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '96x96',
    href: '/favicon/favicon-96x96.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon/favicon-16x16.png',
  },
  {
    rel: 'manifest',
    href: '/favicon/manifest.json',
  },
];

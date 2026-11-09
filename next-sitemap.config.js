const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SITE_URL = 'https://www.pedromebo.com';

function resolveMdxMeta(urlPath) {
  const segments = urlPath.split('/').filter(Boolean);
  if (segments.length !== 2) return null;

  const [section, slug] = segments;
  const folderMap = {
    blog: 'blog',
    projects: 'projects',
    shorts: 'library',
  };
  const folder = folderMap[section];
  if (!folder) return null;

  const filePath = path.join(process.cwd(), 'src', 'contents', folder, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(raw);
    const dateStr = data.lastUpdated || data.publishedAt;
    const lastmod = dateStr ? new Date(dateStr).toISOString() : undefined;

    const isSpanish = !slug.startsWith('en-');
    const cleanSlug = isSpanish ? slug : slug.slice(3);
    const candidateAlt = data.translated_slug || (isSpanish ? `en-${cleanSlug}` : cleanSlug);
    const altPath = path.join(process.cwd(), 'src', 'contents', folder, `${candidateAlt}.mdx`);
    const hasAlt = !data.spanishOnly && fs.existsSync(altPath);

    return {
      lastmod,
      esHref: `${SITE_URL}/${section}/${isSpanish ? slug : candidateAlt}`,
      enHref: hasAlt
        ? `${SITE_URL}/${section}/${isSpanish ? candidateAlt : slug}`
        : undefined,
    };
  } catch {
    return null;
  }
}

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
  transform: async (config, urlPath) => {
    const mdxMeta = resolveMdxMeta(urlPath);

    // Index bilingual pairs (/ <-> /en, /about <-> /en/about, etc.)
    const staticPairs = {
      '/': { es: `${SITE_URL}`, en: `${SITE_URL}/en`, priority: 1.0 },
      '/en': { es: `${SITE_URL}`, en: `${SITE_URL}/en`, priority: 1.0 },
      '/about': { es: `${SITE_URL}/about`, en: `${SITE_URL}/en/about`, priority: 0.9 },
      '/en/about': { es: `${SITE_URL}/about`, en: `${SITE_URL}/en/about`, priority: 0.9 },
      '/blog': { es: `${SITE_URL}/blog`, en: `${SITE_URL}/en/blog`, priority: 0.8 },
      '/en/blog': { es: `${SITE_URL}/blog`, en: `${SITE_URL}/en/blog`, priority: 0.8 },
      '/projects': { es: `${SITE_URL}/projects`, en: `${SITE_URL}/en/projects`, priority: 0.8 },
      '/en/projects': { es: `${SITE_URL}/projects`, en: `${SITE_URL}/en/projects`, priority: 0.8 },
      '/shorts': { es: `${SITE_URL}/shorts`, en: `${SITE_URL}/en/shorts`, priority: 0.7 },
      '/en/shorts': { es: `${SITE_URL}/shorts`, en: `${SITE_URL}/en/shorts`, priority: 0.7 },
    };

    if (staticPairs[urlPath]) {
      const pair = staticPairs[urlPath];
      return {
        loc: urlPath,
        changefreq: 'weekly',
        priority: pair.priority,
        alternateRefs: [
          { href: pair.es, hreflang: 'es', hrefIsAbsolute: true },
          { href: pair.en, hreflang: 'en', hrefIsAbsolute: true },
          { href: pair.es, hreflang: 'x-default', hrefIsAbsolute: true },
        ],
      };
    }

    if (mdxMeta) {
      const alternateRefs =
        mdxMeta.esHref && mdxMeta.enHref
          ? [
              { href: mdxMeta.esHref, hreflang: 'es', hrefIsAbsolute: true },
              { href: mdxMeta.enHref, hreflang: 'en', hrefIsAbsolute: true },
              { href: mdxMeta.esHref, hreflang: 'x-default', hrefIsAbsolute: true },
            ]
          : [];

      return {
        loc: urlPath,
        changefreq: 'monthly',
        priority: 0.8,
        ...(mdxMeta.lastmod ? { lastmod: mdxMeta.lastmod } : {}),
        ...(alternateRefs.length > 0 ? { alternateRefs } : {}),
      };
    }

    return {
      loc: urlPath,
      changefreq: 'monthly',
      priority: 0.7,
    };
  },
};

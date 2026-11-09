import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

import { sortByDate } from '@/lib/mdx.client';
import { getAllFilesFrontmatter } from '@/lib/mdx.server';

export async function getRssXml() {
  const frontmatters = sortByDate(await getAllFilesFrontmatter('blog'));

  const blogUrl = 'https://www.pedromebo.com/blog';
  const rssUrl = 'https://www.pedromebo.com/rss.xml';

  const itemXml = frontmatters
    .filter((fm) => !fm.slug.startsWith('en-'))
    .map(({ slug, title, description, publishedAt, lastUpdated }) =>
      `
    <item>
      <title>${cdata(title)}</title>
      <description>${cdata(description)}</description>
      <link>${blogUrl}/${slug}</link>
      <guid>${blogUrl}/${slug}</guid>
      <pubDate>${new Date(lastUpdated ?? publishedAt).toUTCString()}</pubDate>
    </item>
    `.trim()
    );

  return `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:blogChannel="${blogUrl}">
      <channel>
        <title>Pedro Medinilla Bohórquez (pedromebo) — Blog de Ingeniería de IA</title>
        <link>${blogUrl}</link>
        <description>Artículos técnicos sobre Sistemas Multiagente, Capas Semánticas, RAG Avanzado, LLMs en producción e Ingeniería de Datos.</description>
        <language>es</language>
        <atom:link href="${rssUrl}" rel="self" type="application/rss+xml" />
        <ttl>40</ttl>
        ${itemXml.join('\n')}
      </channel>
    </rss>
  `.trim();
}

function cdata(s: string) {
  return `<![CDATA[${s}]]>`;
}

export async function generateLlmsTxt() {
  const baseUrl = 'https://www.pedromebo.com';
  const blogs = sortByDate(await getAllFilesFrontmatter('blog'));
  const projects = sortByDate(await getAllFilesFrontmatter('projects'));
  const shorts = await getAllFilesFrontmatter('library');

  const esBlogs = blogs.filter((b) => !b.slug.startsWith('en-'));
  const enBlogs = blogs.filter((b) => b.slug.startsWith('en-'));
  const esProjects = projects.filter((p) => !p.slug.startsWith('en-'));
  const enProjects = projects.filter((p) => p.slug.startsWith('en-'));
  const esShorts = shorts.filter((s) => !s.slug.startsWith('en-'));
  const enShorts = shorts.filter((s) => s.slug.startsWith('en-'));

  const llmsTxt = [
    '# Pedro Medinilla Bohórquez (pedromebo) — AI Engineer',
    '',
    '> AI Engineer specialized in Multi-Agent Systems, Semantic Layers, Advanced RAG, and Production LLMs (LLMOps & Evals). Bilingual technical blog, architectural breakdowns, and real-world AI projects in Spanish and English.',
    '',
    '## Author & Core Pages',
    `- [Home (ES)](${baseUrl}) | [Home (EN)](${baseUrl}/en): Overview of featured AI engineering articles, production stack, and projects.`,
    `- [About Pedro (ES)](${baseUrl}/about): Career trajectory (AI Engineer at Timia, Lead AI Engineer at DialogicLab, Senior Data Scientist at Eugen), education (Master in Big Data 98/100, HND Computing Science with Distinction), and contact (\`contacto@pedromebo.com\`).`,
    `- [About Pedro (EN)](${baseUrl}/en/about): Full English biography, professional experience, certifications, and technical stack.`,
    `- [Blog (ES)](${baseUrl}/blog) | [Blog (EN)](${baseUrl}/en/blog)`,
    `- [Projects (ES)](${baseUrl}/projects) | [Projects (EN)](${baseUrl}/en/projects)`,
    `- [Shorts (ES)](${baseUrl}/shorts) | [Shorts (EN)](${baseUrl}/en/shorts)`,
    `- [Full Content Bundle for LLMs](${baseUrl}/llms-full.txt): Complete markdown text of all articles and project case studies.`,
    '',
    '## Featured Projects & Case Studies (Spanish)',
    ...esProjects.map(
      (p) => `- [${p.title}](${baseUrl}/projects/${p.slug}): ${p.description}`
    ),
    '',
    '## Featured Projects & Case Studies (English)',
    ...enProjects.map(
      (p) => `- [${p.title}](${baseUrl}/projects/${p.slug}): ${p.description}`
    ),
    '',
    '## Technical Blog Articles (Spanish)',
    ...esBlogs.map(
      (b) =>
        `- [${b.title}](${baseUrl}/blog/${b.slug}) (${b.publishedAt}): ${b.description}`
    ),
    '',
    '## Technical Blog Articles (English)',
    ...enBlogs.map(
      (b) =>
        `- [${b.title}](${baseUrl}/blog/${b.slug}) (${b.publishedAt}): ${b.description}`
    ),
    '',
    '## Shorts & Quick Engineering Notes',
    ...esShorts.map(
      (s) => `- [ES: ${s.title}](${baseUrl}/shorts/${s.slug}): ${s.description}`
    ),
    ...enShorts.map(
      (s) => `- [EN: ${s.title}](${baseUrl}/shorts/${s.slug}): ${s.description}`
    ),
    '',
    '## Contact & Social Profiles',
    '- Email: contacto@pedromebo.com',
    '- LinkedIn: https://www.linkedin.com/in/pedromebo/',
    '- X (Twitter): https://twitter.com/pedromebo',
    '- GitHub: https://github.com/pedromebo',
    '',
  ].join('\n');

  fs.writeFileSync('public/llms.txt', llmsTxt, 'utf8');

  const readCleanMdx = (folder: string, slug: string) => {
    const filePath = path.join(
      process.cwd(),
      'src',
      'contents',
      folder,
      `${slug}.mdx`
    );
    const raw = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(raw);
    return content.trim();
  };

  const fullSections: string[] = [
    '# Pedro Medinilla Bohórquez (pedromebo) — Full Knowledge Bundle (llms-full.txt)',
    '',
    '> Complete index and full text of technical articles, multi-agent architectures, LLM optimizations, and project case studies published on https://www.pedromebo.com.',
    '',
    '## Profile Summary',
    '- **Name:** Pedro Medinilla Bohórquez (`pedromebo`)',
    '- **Role:** AI Engineer (Multi-Agent Systems, Semantic Layers, Advanced RAG, LLMOps)',
    '- **Experience:** AI Engineer at Timia (2026–Present), Lead AI Engineer at DialogicLab (2025–Present), Senior Data Scientist & Mid Data Engineer at Eugen (2021–2025), AI Lecturer & Data Consultant.',
    '- **Education:** Master in Big Data & Business Intelligence (98/100, Universidad Isabel I); HND in Computing Science & System Development (Distinction / Honors, ESAT Valencia).',
    '- **Contact:** contacto@pedromebo.com | https://www.linkedin.com/in/pedromebo/ | https://twitter.com/pedromebo | https://github.com/pedromebo',
    '',
    '---',
    '',
    '# PART 1: PROJECT CASE STUDIES (SPANISH & ENGLISH)',
    '',
    ...projects.map((p) => {
      const body = readCleanMdx('projects', p.slug);
      return [
        `## Project: ${p.title}`,
        `- **URL:** ${baseUrl}/projects/${p.slug}`,
        `- **Published:** ${p.publishedAt}`,
        `- **Tech Stack:** ${p.techs}`,
        `- **Summary:** ${p.description}`,
        '',
        body,
        '',
        '---',
        '',
      ].join('\n');
    }),
    '# PART 2: TECHNICAL BLOG ARTICLES (SPANISH & ENGLISH)',
    '',
    ...blogs.map((b) => {
      const body = readCleanMdx('blog', b.slug);
      return [
        `## Article: ${b.title}`,
        `- **URL:** ${baseUrl}/blog/${b.slug}`,
        `- **Published:** ${b.publishedAt}`,
        `- **Tags:** ${b.tags}`,
        `- **Description:** ${b.description}`,
        '',
        body,
        '',
        '---',
        '',
      ].join('\n');
    }),
    '# PART 3: SHORTS & ENGINEERING REFLECTIONS',
    '',
    ...shorts.map((s) => {
      const body = readCleanMdx('library', s.slug);
      return [
        `## Short: ${s.title}`,
        `- **URL:** ${baseUrl}/shorts/${s.slug}`,
        `- **Tags:** ${s.tags}`,
        `- **Description:** ${s.description}`,
        '',
        body,
        '',
        '---',
        '',
      ].join('\n');
    }),
  ];

  fs.writeFileSync('public/llms-full.txt', fullSections.join('\n'), 'utf8');
}

export async function generateRss() {
  const xml = await getRssXml();
  fs.writeFileSync('public/rss.xml', xml);
  await generateLlmsTxt();
}

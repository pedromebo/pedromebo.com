const path = require('path');
const createMDX = require('@next/mdx');
const remarkGfm = require('remark-gfm');
const rehypePrettyCode = require('rehype-pretty-code');
const rehypeAutolinkHeadings = require('rehype-autolink-headings');
const { slug: githubSlug } = require('github-slugger');
const { visit } = require('unist-util-visit');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'res.cloudinary.com',
    ],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  transpilePackages: ['react-tweet'],
  async redirects() {
    return [
      {
        source: '/library',
        destination: '/shorts',
        permanent: true,
      },
      {
        source: '/library/:slug',
        destination: '/shorts/:slug',
        permanent: true,
      },
      {
        source: '/informe-de-datos-de-marbella-vice',
        destination: '/blog/informe-datos-marbella-vice',
        permanent: true,
      },
    ];
  },
};

// Custom rehype plugin to add slugs without accents
const rehypeSlugWithoutAccents = () => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) {
        const text = node.children
          .map((child) => {
            if (child.type === 'text') return child.value;
            if (child.value) return child.value;
            return '';
          })
          .join('');
        
        // Use github-slugger to generate slug without accents
        node.properties = node.properties || {};
        node.properties.id = githubSlug(text);
      }
    });
  };
};

const withMDX = createMDX({
  options: {
    providerImportSource: "@/components/content/MDXComponents",
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlugWithoutAccents,
      [rehypePrettyCode, {
        theme: {
          dark: 'github-dark',
          light: 'github-light'
        },
        keepBackground: true,
        defaultLang: 'python',
        onVisitLine(node) {
          // Prevent lines from collapsing in `display: grid` mode, and
          // allow empty lines to be copy/pasted
          if (node.children.length === 0) {
            node.children = [{ type: 'text', value: ' ' }];
          }
        },
        onVisitHighlightedLine(node) {
          node.properties.className.push('highlighted');
        },
        onVisitHighlightedWord(node) {
          node.properties.className = ['word'];
        }
      }],
      [rehypeAutolinkHeadings, {
        properties: {
          className: ['hash-anchor']
        }
      }]
    ],
  },
});

// Export the MDX configuration
module.exports = withMDX(nextConfig);

const path = require('path');

const withRemoteRefresh = require('next-remote-refresh')({
  paths: [path.resolve(__dirname, 'src', 'contents')],
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  images: {
    domains: [
      'res.cloudinary.com',
    ],
  },
  async redirects() {
    return [
      {
        source: '/library/absolute-import',
        destination: '/shorts/react/absolute-import',
        permanent: true,
      },
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

module.exports = withRemoteRefresh(nextConfig);

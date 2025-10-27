import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProps } from 'next/app';
import Router from 'next/router';
import { ThemeProvider } from 'next-themes';
import nProgress from 'nprogress';
import * as React from 'react';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import 'react-tippy/dist/tippy.css';
import 'katex/dist/katex.min.css';
import 'react-tweet/theme.css';
import '@/styles/globals.css';
import '@/styles/mdx.css';
import '@/styles/nprogress.css';

import { getFromLocalStorage } from '@/lib/helper.client';

import { blockDomainMeta } from '@/constants/env';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Don't increment views if not on main domain
    if (
      window.location.host !==
        (process.env.NEXT_PUBLIC_BLOCK_DOMAIN_WHITELIST ||
          'pedromebo.com') &&
      blockDomainMeta
    ) {
      if (getFromLocalStorage('incrementMetaFlag') !== 'false') {
        localStorage.setItem('incrementMetaFlag', 'false');
        // reload page to make changes
        window.location.reload();
      }
    }
  }, []);

  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;

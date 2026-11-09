import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

type MyDocumentProps = DocumentInitialProps & {
  lang?: 'es' | 'en';
};

class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<MyDocumentProps> {
    const initialProps = await Document.getInitialProps(ctx);
    const path = ctx.asPath || ctx.pathname || '';
    const isEnglish =
      path.includes('/en-') ||
      path.startsWith('/en/') ||
      path === '/en' ||
      path.includes('lang=en');

    return {
      ...initialProps,
      lang: isEnglish ? 'en' : 'es',
    };
  }

  render() {
    const lang = this.props.lang ?? 'es';
    return (
      <Html lang={lang}>
        <Head>
          <link
            rel='preload'
            href='/fonts/inter-var-latin.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
          <script
            async
            defer
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || ''}
            src='https://cloud.umami.is/script.js'
            data-domains='www.pedromebo.com'
          />
        </Head>
        <body className='bg-white text-[#111638] antialiased transition-colors dark:bg-[#111638] dark:text-white'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

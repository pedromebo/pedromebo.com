import clsx from 'clsx';
import { InferGetStaticPropsType } from 'next';
import * as React from 'react';
import { FaXTwitter } from 'react-icons/fa6';
import {
  SiApacheairflow,
  SiApachespark,
  SiDocker,
  SiGithub,
  SiLinkedin,
  SiOpenai,
  SiPython,
  SiTensorflow,
} from 'react-icons/si';
import { TbBrandCpp } from 'react-icons/tb';
import { InView } from 'react-intersection-observer';

import { trackEvent } from '@/lib/analytics';
import { getAllFilesFrontmatter, getFeatured } from '@/lib/mdx.server';
import { generateRss } from '@/lib/rss';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import BlogCard from '@/components/content/blog/BlogCard';
import ShortsCard from '@/components/content/card/ShortsCard';
import ProjectCard from '@/components/content/projects/ProjectCard';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import CustomLink from '@/components/links/CustomLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Mascot from '@/components/Mascot';
import Seo from '@/components/Seo';

type IndexPageProps = InferGetStaticPropsType<typeof getStaticProps> & {
  initialLang?: 'es' | 'en';
};

export default function IndexPage({
  featuredPosts,
  featuredPostsEn,
  featuredProjects,
  featuredProjectsEn,
  featuredShorts,
  featuredShortsEn,
  introPosts,
  introPostsEn,
  initialLang = 'es',
}: IndexPageProps) {
  const isLoaded = useLoaded();
  const isSpanish = initialLang !== 'en';
  const activeFeaturedPosts = isSpanish ? featuredPosts : featuredPostsEn;
  const activeFeaturedProjects = isSpanish
    ? featuredProjects
    : featuredProjectsEn;
  const activeFeaturedShorts = isSpanish ? featuredShorts : featuredShortsEn;
  const activeIntroPosts = isSpanish ? introPosts : introPostsEn;

  const renderSocialLinks = (extraClass?: string) => (
    <div
      className={clsx(
        'flex flex-wrap items-center gap-5 gap-y-2 text-sm font-medium md:text-base',
        extraClass
      )}
    >
      <UnstyledLink
        href='https://www.linkedin.com/in/pedromebo/'
        className='group inline-flex items-center gap-1.5 text-[#586094] transition-colors hover:text-[#111638] dark:text-[#b6bddb] dark:hover:text-white'
        onClick={() => trackEvent('Social Link: Linkedin', { type: 'link' })}
      >
        <SiLinkedin className='shrink-0 text-[#00b89c] transition-transform group-hover:scale-110 dark:text-[#00f5d4]' />
        <span>Pedromebo</span>
      </UnstyledLink>
      <UnstyledLink
        href='https://twitter.com/pedromebo'
        className='group inline-flex items-center gap-1.5 text-[#586094] transition-colors hover:text-[#111638] dark:text-[#b6bddb] dark:hover:text-white'
        onClick={() => trackEvent('Social Link: Twitter', { type: 'link' })}
      >
        <FaXTwitter className='shrink-0 text-[#ff2e93] transition-transform group-hover:scale-110' />
        <span>@pedromebo</span>
      </UnstyledLink>
      <UnstyledLink
        href='https://github.com/pedromebo'
        className='group inline-flex items-center gap-1.5 text-[#586094] transition-colors hover:text-[#111638] dark:text-[#b6bddb] dark:hover:text-white'
        onClick={() => trackEvent('Social Link: Github', { type: 'link' })}
      >
        <SiGithub className='shrink-0 text-[#596dff] transition-transform group-hover:scale-110' />
        <span>pedromebo</span>
      </UnstyledLink>
    </div>
  );

  const renderStackedIntroCards = () => (
    <div className='relative w-full py-6 md:py-0'>
      <div className='group relative mx-auto flex min-h-[410px] w-full max-w-[370px] items-center justify-center sm:min-h-[440px]'>
        {/* Background glow behind stacked cards */}
        <div
          aria-hidden='true'
          className='pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#00f5d4]/10 via-[#596dff]/15 to-[#ff2e93]/10 opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100'
        />

        {/* Back Card (Interactivo en hover con efecto abanico) */}
        <div
          className={clsx(
            'absolute w-full max-w-[330px] sm:max-w-[340px] transform-gpu transition-all duration-300 ease-out',
            'top-6 left-1/2 -translate-x-[42%] rotate-3 sm:rotate-6',
            'group-hover:-translate-y-2 group-hover:translate-x-[-28%] group-hover:rotate-8 sm:group-hover:translate-x-[-22%] sm:group-hover:rotate-12',
            'hover:!z-30 hover:scale-[1.03]',
            'opacity-90 hover:opacity-100'
          )}
        >
          <div className='relative'>
            <span className='absolute -top-3 right-4 z-20 rounded-full border border-[#596dff] bg-[#24208f] px-2.5 py-0.5 font-mono text-[10px] font-bold text-white shadow-md'>
              {isSpanish ? 'Recomendado' : 'Recommended'}
            </span>
            <BlogCard post={activeIntroPosts[1]} />
          </div>
        </div>

        {/* Front Card */}
        <div
          className={clsx(
            'relative z-20 w-full max-w-[330px] sm:max-w-[340px] transform-gpu transition-all duration-300 ease-out',
            'group-hover:-translate-y-1 group-hover:-translate-x-4 group-hover:-rotate-2 sm:group-hover:-translate-x-6',
            'hover:!z-30 hover:scale-[1.03]'
          )}
        >
          <BlogCard post={activeIntroPosts[0]} />
        </div>
      </div>
      <p className='mt-2 text-center font-mono text-xs text-[#586094] dark:text-[#b6bddb]/70 sm:hidden'>
        {isSpanish
          ? 'Pasa el ratón o pulsa para explorar las lecturas recomendadas'
          : 'Hover or tap to explore recommended reads'}
      </p>
    </div>
  );

  return (
    <Layout>
      <Seo
        lang={isSpanish ? 'es' : 'en'}
        esUrl='https://www.pedromebo.com'
        enUrl='https://www.pedromebo.com/en'
        title={
          isSpanish
            ? undefined
            : 'Pedro Medinilla Bohórquez (pedromebo) | AI Engineer — Multi-Agent Systems, LLMs & Production AI'
        }
        description={
          isSpanish
            ? undefined
            : 'AI Engineer specialized in Multi-Agent Systems, Semantic Layers, Advanced RAG, and Production LLMs. Architectural deep-dives, optimizations, and real-world AI projects.'
        }
      />

      <main>
        <section
          className={clsx(
            'relative overflow-hidden border-b border-[#cbcfe0] py-14 dark:border-[#262f6e] md:py-24',
            isLoaded && 'fade-in-start'
          )}
        >
          {/* Subtle Synthwave Grid Background */}
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-0 overflow-hidden'
          >
            <div
              className='absolute inset-0 opacity-[0.06] dark:opacity-15'
              style={{
                backgroundImage:
                  'linear-gradient(to right, #262f6e 1px, transparent 1px), linear-gradient(to bottom, #262f6e 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />
            <div className='absolute -top-32 right-10 h-72 w-72 rounded-full bg-[#00f5d4] opacity-10 blur-[110px]' />
            <div className='absolute bottom-0 left-10 h-72 w-72 rounded-full bg-[#ff2e93] opacity-10 blur-[110px]' />
          </div>

          <article className='layout relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12'>
            {/* Left Column: Hero Copy */}
            <div className='lg:col-span-7'>
              <div
                className='inline-flex flex-wrap items-center gap-2'
                data-fade='1'
              >
                <span className='rounded-[4px] border border-[#262f6e] bg-[#0a0d24] px-2.5 py-1 font-mono text-xs font-bold text-[#00f5d4]'>
                  {isSpanish ? '¡Hola! Soy Pedro' : "Hi! I'm Pedro"}
                </span>
                <span className='rounded-[4px] bg-[#ff2e93] px-2.5 py-1 font-mono text-xs font-extrabold uppercase text-[#111638]'>
                  AI Engineer
                </span>
              </div>

              <h1
                className='mt-5 text-3xl font-extrabold tracking-tight text-[#111638] dark:text-white sm:text-5xl 2xl:text-6xl 2xl:leading-[1.12]'
                data-fade='2'
              >
                {isSpanish
                  ? '¿Me acompañas a descubrir y construir el mundo de la '
                  : 'Join me in discovering and building the world of '}
                <span className='inline-block rounded-[6px] bg-[#00f5d4] px-2.5 py-0.5 text-[#111638] shadow-[0_0_25px_-5px_rgba(0,245,212,0.55)]'>
                  {isSpanish ? 'IA y los datos?' : 'AI & Data'}
                </span>
              </h1>

              <p
                className='mt-4 max-w-2xl text-base leading-relaxed text-[#586094] dark:text-[#b6bddb] md:text-lg'
                data-fade='3'
              >
                {isSpanish
                  ? 'AI Engineer especializado en sistemas multiagente, capas semánticas, RAG avanzado y puesta en producción de LLMs. Comparto arquitecturas, optimizaciones de rendimiento y proyectos prácticos para llevar la inteligencia artificial de la teoría al impacto real.'
                  : 'AI Engineer specialized in Multi-Agent Systems, Semantic Layers, Advanced RAG, and LLMs in production. I share system architectures, performance optimizations, and practical builds to take artificial intelligence from theory to real-world impact.'}
              </p>

              <p
                className='mt-3 text-base text-[#586094] dark:text-[#b6bddb] md:text-lg'
                data-fade='4'
              >
                {isSpanish ? '¡No olvides de seguirme en ' : "Don't forget to follow me on "}
                <CustomLink
                  href='https://twitter.com/pedromebo'
                  onClick={() =>
                    trackEvent('Social Link: Twitter', { type: 'link' })
                  }
                >
                  Twitter
                </CustomLink>
                !
              </p>

              <div
                data-fade='5'
                className='mt-7 flex flex-wrap items-center gap-4'
              >
                <div className='group relative'>
                  <div
                    className={clsx(
                      'animate-tilt absolute -inset-0.5 rounded-xl blur',
                      'bg-gradient-to-r from-[#00f5d4] via-[#596dff] to-[#ff2e93]',
                      'opacity-70 transition duration-1000 group-hover:opacity-100 group-hover:duration-200'
                    )}
                  />
                  <UnstyledLink
                    href='#intro'
                    onClick={() =>
                      trackEvent('Home: Explorar el blog', { type: 'navigate' })
                    }
                    className='relative inline-flex items-center justify-center rounded-xl bg-[#00f5d4] px-5 py-2.5 font-mono text-sm font-bold text-[#0a0d24] shadow-[0_0_20px_rgba(0,245,212,0.4)] transition-all duration-200 hover:scale-105 hover:bg-[#33f7dc] active:scale-95'
                  >
                    {isSpanish ? 'Explorar el blog →' : 'Explore the blog →'}
                  </UnstyledLink>
                </div>
                <UnstyledLink
                  href={isSpanish ? '/about' : '/en/about'}
                  onClick={() =>
                    trackEvent('Home: Quien soy', { type: 'navigate' })
                  }
                  className='inline-flex items-center justify-center rounded-xl border border-[#cbcfe0] bg-white px-5 py-2.5 font-mono text-sm font-bold text-[#111638] shadow-sm transition-all duration-200 hover:scale-105 hover:border-[#596dff] hover:text-[#596dff] active:scale-95 dark:border-[#262f6e] dark:bg-[#0a0d24] dark:text-white dark:hover:border-[#00f5d4] dark:hover:text-[#00f5d4]'
                >
                  {isSpanish ? '¿Quién soy?' : 'About me'}
                </UnstyledLink>
              </div>

              <div data-fade='6' className='mt-6'>
                {renderSocialLinks()}
              </div>
            </div>

            {/* Right Column: Mascot Sticker Illustration */}
            <div className='lg:col-span-5' data-fade='4'>
              <Mascot mascotId={1} />
            </div>
          </article>
        </section>

        {/* Tech Stack Strip */}
        <section className='border-b border-[#cbcfe0] bg-[#eff0f7]/60 py-6 dark:border-[#262f6e] dark:bg-[#0a0d24]'>
          <div className='layout flex flex-wrap items-center justify-between gap-4'>
            <span className='font-mono text-xs font-bold uppercase tracking-wider text-[#586094] dark:text-[#00f5d4]'>
              {isSpanish
                ? 'STACK & ECOSISTEMA EN PRODUCCIÓN:'
                : 'PRODUCTION STACK & ECOSYSTEM:'}
            </span>
            <div className='flex flex-wrap items-center gap-5 text-[#586094] dark:text-[#b6bddb]'>
              <span className='inline-flex items-center gap-1.5 text-xs font-semibold'>
                <SiPython className='h-4 w-4 text-[#00f5d4]' /> Python
              </span>
              <span className='inline-flex items-center gap-1.5 text-xs font-semibold'>
                <SiTensorflow className='h-4 w-4 text-[#ff2e93]' /> TensorFlow
              </span>
              <span className='inline-flex items-center gap-1.5 text-xs font-semibold'>
                <SiOpenai className='h-4 w-4 text-[#00f5d4]' /> OpenAI & LLMs
              </span>
              <span className='inline-flex items-center gap-1.5 text-xs font-semibold'>
                <SiApachespark className='h-4 w-4 text-[#ff2e93]' /> Spark
              </span>
              <span className='inline-flex items-center gap-1.5 text-xs font-semibold'>
                <SiApacheairflow className='h-4 w-4 text-[#596dff]' /> Airflow
              </span>
              <span className='inline-flex items-center gap-1.5 text-xs font-semibold'>
                <SiDocker className='h-4 w-4 text-[#00f5d4]' /> Docker
              </span>
              <span className='inline-flex items-center gap-1.5 text-xs font-semibold'>
                <TbBrandCpp className='h-4 w-4 text-[#596dff]' /> C++ / OpenGL
              </span>
            </div>
          </div>
        </section>

        {/* #intro Section with Stacked Cards + Mascot Companion */}
        <InView triggerOnce rootMargin='100px 0px'>
          {({ ref, inView }) => (
            <section
              ref={ref}
              id='intro'
              className={clsx('py-20 md:py-28', inView && 'fade-in-start')}
            >
              <article
                className='layout flex flex-col-reverse items-center gap-12 md:flex-row md:items-center md:justify-between'
              >
                <div className='w-full md:max-w-xl'>
                  <div className='inline-flex items-center gap-2 rounded-[6px] border border-[#262f6e] bg-[#eff0f7] px-3 py-1 font-mono text-xs font-bold text-[#24208f] dark:bg-[#0a0d24] dark:text-[#00f5d4]'>
                    <span>
                      {isSpanish ? '✦ APRENDIZAJE PRÁCTICO' : '✦ HANDS-ON ENGINEERING'}
                    </span>
                  </div>

                  <h2 className='mt-4 text-3xl font-extrabold sm:text-5xl md:text-5xl 2xl:text-6xl'>
                    <Accent className='inline decoration-clone leading-snug dark:leading-none'>
                      {isSpanish
                        ? 'Reimagina tu forma de aprender'
                        : 'Reimagine the way you learn'}
                    </Accent>
                  </h2>

                  <p className='mt-5 text-base leading-relaxed text-[#586094] dark:text-[#b6bddb] md:text-lg'>
                    {isSpanish ? (
                      <>
                        Inspírate mediante artículos en profundidad y proyectos reales. Aprende creando
                        y desarrollando{' '}
                        <strong className='text-[#111638] dark:text-white'>
                          soluciones de IA completas
                        </strong>{' '}
                        y redescubre nuevas formas de afrontar problemas de ingeniería en el día a día.
                      </>
                    ) : (
                      <>
                        Get inspired through deep-dive articles and real-world engineering builds. Learn by designing and shipping{' '}
                        <strong className='text-[#111638] dark:text-white'>
                          end-to-end AI solutions
                        </strong>{' '}
                        and discover new ways to tackle day-to-day engineering challenges.
                      </>
                    )}
                  </p>

                  <div className='mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-xs font-semibold text-[#111638] dark:text-white'>
                    <div className='flex items-center gap-2 rounded-lg border border-[#cbcfe0] bg-white/70 px-3 py-2 dark:border-[#262f6e] dark:bg-[#0a0d24]/60'>
                      <span className='h-2 w-2 rounded-full bg-[#00f5d4]' />
                      {isSpanish
                        ? 'De la teoría al código funcional'
                        : 'From theory to working code'}
                    </div>
                    <div className='flex items-center gap-2 rounded-lg border border-[#cbcfe0] bg-white/70 px-3 py-2 dark:border-[#262f6e] dark:bg-[#0a0d24]/60'>
                      <span className='h-2 w-2 rounded-full bg-[#ff2e93]' />
                      {isSpanish
                        ? 'Arquitecturas probadas en producción'
                        : 'Production-tested architectures'}
                    </div>
                  </div>
                </div>

                <div className='w-full md:max-w-md'>
                  {renderStackedIntroCards()}
                </div>
              </article>
            </section>
          )}
        </InView>

        {/* Featured Blog Posts */}
        <InView triggerOnce rootMargin='50px 0px'>
          {({ ref, inView }) => (
            <section
              ref={ref}
              className={clsx(
                'border-t border-[#cbcfe0] py-20 dark:border-[#262f6e]',
                inView && 'fade-in-start'
              )}
            >
              <article className='layout'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h2 className='text-2xl md:text-4xl' id='blog'>
                      <Accent>
                        {isSpanish ? 'Publicaciones destacadas' : 'Featured posts'}
                      </Accent>
                    </h2>
                    <p className='mt-2 text-[#586094] dark:text-[#b6bddb]'>
                      {isSpanish
                        ? 'Artículos y reflexiones sobre datos, arquitectura e IA'
                        : 'Articles and deep-dives on data, system architecture, and AI'}
                    </p>
                  </div>
                  <Mascot
                    pose='reading'
                    mode='sticker'
                    size='xs'
                    className='hidden max-w-[85px] sm:block'
                  />
                </div>
                <ul className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                  {activeFeaturedPosts.map((post, i) => (
                    <BlogCard
                      key={post.slug}
                      post={post}
                      className={clsx(i > 2 && 'hidden sm:block')}
                    />
                  ))}
                </ul>
                <ButtonLink
                  className='mt-4'
                  href={isSpanish ? '/blog' : '/en/blog'}
                  onClick={() =>
                    trackEvent('Home: Ver más publicaciones', {
                      type: 'navigate',
                    })
                  }
                >
                  {isSpanish ? 'Ver más publicaciones' : 'See more posts'}
                </ButtonLink>
              </article>
            </section>
          )}
        </InView>

        {/* Featured Projects on Spotlight Surface */}
        <InView triggerOnce rootMargin='50px 0px'>
          {({ ref, inView }) => (
            <section
              ref={ref}
              className={clsx(
                'border-y border-[#cbcfe0] bg-[#eff0f7]/40 py-20 dark:border-[#262f6e] dark:bg-[#0a0d24]/70',
                inView && 'fade-in-start'
              )}
            >
              <article className='layout'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h2 className='text-2xl md:text-4xl' id='projects'>
                      <Accent>
                        {isSpanish ? 'Proyectos destacados' : 'Featured projects'}
                      </Accent>
                    </h2>
                    <p className='mt-2 text-[#586094] dark:text-[#b6bddb]'>
                      {isSpanish
                        ? 'Algunos proyectos de los que estoy orgulloso'
                        : 'Production systems and projects I am proud of'}
                    </p>
                  </div>
                  <Mascot
                    pose='rocket'
                    mode='sticker'
                    size='xs'
                    className='hidden max-w-[85px] sm:block'
                  />
                </div>
                <ul className='mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                  {activeFeaturedProjects.map((project, i) => (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                      className={clsx(i > 2 && 'hidden sm:block')}
                    />
                  ))}
                </ul>
                <ButtonLink
                  className='mt-4'
                  href={isSpanish ? '/projects' : '/en/projects'}
                  onClick={() =>
                    trackEvent('Home: See more project', { type: 'navigate' })
                  }
                >
                  {isSpanish ? 'Ver más proyectos' : 'See more projects'}
                </ButtonLink>
              </article>
            </section>
          )}
        </InView>

        {/* Featured Shorts */}
        <InView triggerOnce rootMargin='50px 0px'>
          {({ ref, inView }) => (
            <section
              ref={ref}
              className={clsx('py-20', inView && 'fade-in-start')}
            >
              <article className='layout'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h2 className='text-2xl md:text-4xl' id='library'>
                      <Accent>Shorts</Accent>
                    </h2>
                    <p className='mt-2 text-[#586094] dark:text-[#b6bddb]'>
                      {isSpanish
                        ? 'Mini artículos o micro publicaciones. Suelen ser consejos rápidos sobre código, desarrollo o reflexiones.'
                        : 'Short notes and micro-posts with quick tips on code, engineering, and AI reflections.'}
                    </p>
                  </div>
                  <Mascot
                    pose='thinking'
                    mode='sticker'
                    size='xs'
                    className='hidden max-w-[80px] sm:block'
                  />
                </div>
                <ul className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                  {activeFeaturedShorts.map((short, i) => (
                    <ShortsCard
                      key={short.slug}
                      short={short}
                      className={clsx(i > 2 && 'hidden sm:block')}
                    />
                  ))}
                </ul>
                <ButtonLink
                  className='mt-4'
                  href={isSpanish ? '/shorts' : '/en/shorts'}
                  onClick={() =>
                    trackEvent('Home: Ver más shorts', { type: 'navigate' })
                  }
                >
                  {isSpanish ? 'Ver más shorts' : 'See more shorts'}
                </ButtonLink>
              </article>
            </section>
          )}
        </InView>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  generateRss();

  const blogs = await getAllFilesFrontmatter('blog');
  const projects = await getAllFilesFrontmatter('projects');
  const shorts = await getAllFilesFrontmatter('library');

  const featuredPosts = getFeatured(blogs, [
    'como-funciona-deepseek-r1',
    'llm-semantic-cache',
    'como-usar-docker-model-runner',
  ]);
  const featuredPostsEn = getFeatured(blogs, [
    'en-how-deepseek-r1-works',
    'en-llm-semantic-cache',
    'en-how-to-use-docker-model-runner',
  ]);

  const featuredProjects = getFeatured(projects, [
    'dialogiclab',
    'informe-datos-marbella-vice',
    'cpp-opengl-engine',
  ]);
  const featuredProjectsEn = getFeatured(projects, [
    'en-dialogiclab',
    'en-informe-datos-marbella-vice',
    'en-cpp-opengl-engine',
  ]);

  const introPosts = getFeatured(blogs, [
    'como-funciona-deepseek-r1',
    'llm-semantic-cache',
  ]);
  const introPostsEn = getFeatured(blogs, [
    'en-how-deepseek-r1-works',
    'en-llm-semantic-cache',
  ]);

  const featuredShorts = getFeatured(shorts, ['nuevos-desarrolladores-ia']);
  const featuredShortsEn = getFeatured(shorts, [
    'en-nuevos-desarrolladores-ia',
  ]);

  return {
    props: {
      featuredPosts,
      featuredPostsEn,
      featuredProjects,
      featuredProjectsEn,
      featuredShorts,
      featuredShortsEn,
      introPosts,
      introPostsEn,
    },
  };
}

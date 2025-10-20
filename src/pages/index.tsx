import clsx from 'clsx';
import { InferGetStaticPropsType } from 'next';
import * as React from 'react';
import { IoArrowDownOutline } from 'react-icons/io5';
import { IoNewspaperSharp } from 'react-icons/io5';

import { SiGithub, SiLinkedin } from 'react-icons/si';
import {FaXTwitter} from 'react-icons/fa6';
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
import Seo from '@/components/Seo';
import PMB from '@/components/PMB';

export default function IndexPage({
  featuredPosts,
  featuredProjects,
  featuredShorts,
  introPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo />

      <main>
        <section
          className={clsx(
            'min-h-main -mt-20 mb-20 flex flex-col justify-center',
            isLoaded && 'fade-in-start'
          )}
        >
          <article className='layout'>
            <h2 className='text-2xl md:text-4xl 2xl:text-5xl mb-4' data-fade='1'>
              ¡Hola! Soy <Accent>Pedro</Accent>,
            </h2>
            <h1
              className='mt-1 text-3xl md:text-5xl 2xl:text-6xl'
              data-fade='2'
            >
              ¿me acompañas a descubrir el mundo de los datos y la IA?
            </h1>
            <p
              className='mt-2 max-w-4xl leading-relaxed text-gray-700 dark:text-gray-200 md:mt-3 text-sm md:text-base 2xl:text-lg'
              data-fade='2'
              onClick={() => {
                trackEvent('Social Link: Dimension', { type: 'link' });
              }}
            >
              Ingeniero/Científico de datos en constante aprendizaje
            </p>
            <p
              className={clsx(
                'mt-4 max-w-4xl text-gray-700 dark:text-gray-200 md:mt-6',
                'md:text-lg 2xl:text-xl'
              )}
              data-fade='3'
            >
              Explora un universo de innovación y los últimos avances en inteligencia artificial. Aquí encontrarás desde noticias hasta proyectos únicos que te ayudarán a seguir aprendiendo y estar al día.
            </p>

            <p
              className='mt-3 max-w-4xl leading-relaxed text-gray-700 dark:text-gray-200 md:mt-4 md:text-lg 2xl:text-xl'
              data-fade='4'
            >
              ¡No olvides de seguirme en {' '}
              <CustomLink
                href='https://twitter.com/pedromebo'
                onClick={() => {
                  trackEvent('Social Link: Twitter', { type: 'link' });
                }}
              >
                Twitter
              </CustomLink>!
            </p>
            <div
              data-fade='5'
              className='mt-8 flex flex-wrap gap-4 md:!text-lg'
            >
              <div className='group relative'>
                <div
                  className={clsx(
                    'absolute -inset-0.5 animate-tilt rounded blur',
                    'bg-gradient-to-r from-primary-300 to-primary-400',
                    'dark:from-primary-200 dark:via-primary-300',
                    'opacity-75 transition duration-1000 group-hover:opacity-100 group-hover:duration-200'
                  )}
                  />
                <ButtonLink href='#intro'>Explorar el blog</ButtonLink>
              </div>
              <ButtonLink href='/about'>¿Quién soy?</ButtonLink>
            </div>
            <div
              data-fade='6'
              className='mt-4 flex flex-wrap gap-4 gap-y-2 md:mt-8'
            >
              <UnstyledLink
                href='https://www.linkedin.com/in/pedromebo/'
                className={clsx(
                  'inline-flex items-center gap-1 text-sm font-medium md:text-base',
                  'group text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white',
                  'focus:outline-none focus-visible:ring focus-visible:ring-primary-300',
                  'transition-colors'
                )}
                onClick={() => {
                  trackEvent('Social Link: Linkedin', { type: 'link' });
                }}
              >
                <SiLinkedin className='shrink-0 transition-colors group-hover:text-[#1da1f2]' />
                <span>Pedromebo</span>
              </UnstyledLink>
              <UnstyledLink
                href='https://twitter.com/pedromebo'
                className={clsx(
                  'inline-flex items-center gap-1 text-sm font-medium md:text-base',
                  'group text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white',
                  'focus:outline-none focus-visible:ring focus-visible:ring-primary-300',
                  'transition-colors'
                )}
                onClick={() => {
                  trackEvent('Social Link: Twitter', { type: 'link' });
                }}
              >
                <FaXTwitter className='shrink-0 transition-colors group-hover:text-[#1da1f2]' />
                <span>@pedromebo</span>
              </UnstyledLink>
              <UnstyledLink
                href='https://github.com/pedromebo'
                className={clsx(
                  'inline-flex items-center gap-1 text-sm font-medium md:text-base',
                  'text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white',
                  'focus:outline-none focus-visible:ring focus-visible:ring-primary-300',
                  'transition-colors'
                )}
                onClick={() => {
                  trackEvent('Social Link: Github', { type: 'link' });
                }}
              >
                <SiGithub className='shrink-0' />
                <span>pedromebo</span>
              </UnstyledLink>
            </div>
          </article>
          <UnstyledLink
            href='#intro'
            className={clsx(
              'absolute bottom-2 left-1/2 -translate-x-1/2 md:bottom-10',
              'cursor-pointer rounded-md transition-colors',
              'hover:text-primary-300 focus-visible:text-primary-300'
            )}
          >
            <IoArrowDownOutline className='h-8 w-8 animate-bounce md:h-10 md:w-10' />
          </UnstyledLink>
          <PMB
            className={clsx(
              'absolute bottom-0 right-6',
              'translate-y-[37%] transform-gpu',
              'w-[calc(100%-3rem)] md:w-[600px] 2xl:w-[900px]',
              'z-[-1] opacity-70 dark:opacity-30'
            )}
          />
        </section>

        <InView triggerOnce rootMargin='-40% 0px'>
          {({ ref, inView }) => (
            <section
              ref={ref}
              id='intro'
              className={clsx('py-20', inView && 'fade-in-start')}
            >
              <article
                className={clsx(
                  'layout flex flex-col-reverse items-center md:flex-row md:justify-start',
                  'md:gap-4'
                )}
                data-fade='0'
              >
                <div className='mt-8 h-full w-full md:mt-0'>
                  <h2 className='text-4xl md:text-6xl'>
                    <Accent className='inline decoration-clone leading-snug dark:leading-none'>
                      Reimagina tu forma de aprender
                    </Accent>
                  </h2>
                  <div className='mt-4 text-base text-gray-600 dark:text-gray-300 md:text-lg'>
                    Inspírate mediante artículos y proyectos. Aprende creando
                    y desarrollando {' '}
                    <strong className='text-gray-700 dark:text-gray-200'>
                    productos de IA completos 
                    </strong>{' '}
                    y redescubre nuevas formas de afrontar problemas del día a día.
                  </div>
                </div>
                <div className='h-full w-full'>
                  <ul className='relative h-full'>
                    <BlogCard
                      className={clsx(
                        'absolute max-w-[350px] transform-gpu',
                        'top-1/2 translate-y-[-55%] md:translate-y-[-50%] lg:translate-y-[-60%]',
                        'left-1/2 -translate-x-1/2 md:translate-x-[-50%] lg:translate-x-[-30%]',
                        'rotate-3 md:rotate-6 lg:rotate-12',
                        'pointer-events-none md:pointer-events-auto'
                      )}
                      post={introPosts[1]}
                    />
                    <BlogCard
                      className='mx-auto max-w-[350px]'
                      post={introPosts[0]}
                    />
                  </ul>
                </div>
              </article>
            </section>
          )}
        </InView>

        <InView triggerOnce rootMargin='-40% 0px'>
          {({ ref, inView }) => (
            <section
              ref={ref}
              className={clsx('py-20', inView && 'fade-in-start')}
            >
              <article className='layout' data-fade='0'>
                <h2 className='text-2xl md:text-4xl' id='blog'>
                  <Accent>Publicaciones destacadas</Accent>
                </h2>
                <ul className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                  {featuredPosts.map((post, i) => (
                    <BlogCard
                      key={post.slug}
                      post={post}
                      className={clsx(i > 2 && 'hidden sm:block')}
                    />
                  ))}
                </ul>
                <ButtonLink
                  className='mt-4'
                  href='/blog'
                  onClick={() =>
                    trackEvent('Home: Ver más publicaciones', { type: 'navigate' })
                  }
                >
                  Ver más publicaciones
                </ButtonLink>
              </article>
            </section>
          )}
        </InView>

        <InView triggerOnce rootMargin='-40% 0px'>
          {({ ref, inView }) => (
            <section
              ref={ref}
              className={clsx('py-20', inView && 'fade-in-start')}
            >
              <article className='layout' data-fade='0'>
                <h2 className='text-2xl md:text-4xl' id='projects'>
                  <Accent>Proyectos destacados</Accent>
                </h2>
                <p className='mt-2 text-gray-600 dark:text-gray-300'>
                  Algunos proyectos de los que estoy orgulloso
                </p>
                <ul className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                  {featuredProjects.map((project, i) => (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                      className={clsx(i > 2 && 'hidden sm:block')}
                    />
                  ))}
                </ul>
                <ButtonLink
                  className='mt-4'
                  href='/projects'
                  onClick={() =>
                    trackEvent('Home: See more project', { type: 'navigate' })
                  }
                >
                  Ver más proyectos
                </ButtonLink>
              </article>
            </section>
          )}
        </InView>

        <InView triggerOnce rootMargin='-40% 0px'>
          {({ ref, inView }) => (
            <section
              ref={ref}
              className={clsx('py-20', inView && 'fade-in-start')}
            >
              <article className='layout' data-fade='0'>
                <h2 className='text-2xl md:text-4xl' id='library'>
                  <Accent>Shorts</Accent>
                </h2>
                <p className='mt-2 text-gray-600 dark:text-gray-300'>
                  Mini artículos o micro publicaciones. Suelen ser consejos rápidos sobre código, desarrollo o reflexiones.
                </p>
                <ul className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                  {featuredShorts.map((short, i) => (
                    <ShortsCard
                      key={short.slug}
                      short={short}
                      className={clsx(i > 2 && 'hidden sm:block')}
                    />
                  ))}
                </ul>
                <ButtonLink
                  className='mt-4'
                  href='/shorts'
                  onClick={() =>
                    trackEvent('Home: Ver más shorts', { type: 'navigate' })
                  }
                >
                  Ver más shorts
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
    'como-usar-docker-model-runner',
    'como-funciona-deepseek-r1',
    'uv-gestor-paquetes-python'
  ]);
  const featuredProjects = getFeatured(projects, [
    'informe-datos-marbella-vice',
    'oona-the-druids-path',
    'cpp-opengl-engine'
  ]);
  const introPosts = getFeatured(blogs, [
    'uv-gestor-paquetes-python',
    'como-funciona-deepseek-r1'
  ]);
  const featuredShorts = getFeatured(shorts, [
    'nuevos-desarrolladores-ia'
  ]);

  return {
    props: {
      featuredPosts,
      featuredProjects,
      featuredShorts,
      introPosts,
    },
  };
}

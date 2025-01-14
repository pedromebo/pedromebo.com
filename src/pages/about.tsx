import clsx from 'clsx';
import * as React from 'react';

import { trackEvent } from '@/lib/analytics';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import CloudinaryImg from '@/components/images/CloudinaryImg';
import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';
import TechStackDataEngineering from '@/components/TechStackDataEngineering';
import TechStackLanguages from '@/components/TechStackLanguages';
import TechStackAI from '@/components/TechStackAI';
import TechStackInfra from '@/components/TechStackInfra';
import Button from '@/components/buttons/Button';

import translations from '@/constants/translations/about';

export default function AboutPage() {
  const isLoaded = useLoaded();
  const [isSpanish, setisSpanish] = React.useState<boolean>(true);

  const t = isSpanish ? translations.es : translations.en;

  return (
    <Layout>
      <Seo templateTitle={t.seoTitle} description={t.seoDescription} />

      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout pt-20'>
            <h2 data-fade='0'>{t.aboutMe}</h2>
            <h1 className='mt-1' data-fade='1'>
              <Accent>Pedro Medinilla Bohórquez</Accent>
            </h1>
            <div
              className='relative z-10 mt-6 flex flex-col items-end gap-4 text-gray-600 dark:text-gray-300 md:flex-row md:items-center md:justify-between'
              data-fade='4'
            >
              <Button
                onClick={() => setisSpanish((b) => !b)}
                className='text-sm !font-medium'
              >
                {t.readIn}
              </Button>
            </div>
            <div className='mt-4' data-fade='2'>
              <CloudinaryImg
                className='float-right ml-6 w-40 md:w-72'
                publicId='pedromebo/about/presentation-pic.png'
                width='512'
                height='384'
                alt='Foto de mí en una presentación sobre Transformers'
                title=' '
              />
              <article className='prose dark:prose-invert'>
                <p data-fade='3'>
                  {t.greeting}{' '}
                  {t.introText}
                  <CustomLink href='/projects'>{t.projects}</CustomLink>
                  {t.certifications}
                </p>
                <p data-fade='4'>{t.paragraph2}</p>
                <p data-fade='5'>
                  {t.paragraph3}
                  <CustomLink
                    href='https://twitter.com/pedromebo'
                    onClick={() => {
                      trackEvent('Social Link: Twitter', { type: 'link' });
                    }}
                  >
                    <span>@pedromebo</span>
                  </CustomLink>
                  !
                </p>
              </article>
              <h3 className='h4 mt-4' data-fade='6'>
                {t.whatIDo}
              </h3>
              <article className='prose mt-2 dark:prose-invert' data-fade='7'>
                <ul>
                  <li>
                    {t.workDetails[0]}
                    <CustomLink
                      onClick={() =>
                        trackEvent('Now: Eugen', { type: 'link' })
                      }
                      href='https://eugen.solutions/'
                    >
                      Eugen
                    </CustomLink>
                    {t.workDetails[1]}
                  </li>
                  <li>{t.workDetails[2]}</li>
                </ul>
              </article>

              <h3 className='mt-12' data-fade='8'>
                {t.languagesStack}
              </h3>
              <figure className='mt-2' data-fade='9'>
                <TechStackLanguages isSpanish={isSpanish} />
              </figure>
              <h3 className='mt-12' data-fade='8'>
                {t.aiStack}
              </h3>
              <figure className='mt-2' data-fade='9'>
                <TechStackAI isSpanish={isSpanish} />
              </figure>
              <h3 className='mt-12' data-fade='8'>
                {t.deStack}
              </h3>
              <figure className='mt-2' data-fade='9'>
                <TechStackDataEngineering isSpanish={isSpanish}/>
              </figure>
              <h3 className='mt-12' data-fade='8'>
                {t.infraStack}
              </h3>
              <figure className='mt-2' data-fade='9'>
                <TechStackInfra isSpanish={isSpanish} />
              </figure>
            </div>
          </div>
        </section>

        <section>
          <div className='layout mt-16'>
            <h2>{t.contactMeTitle}</h2>
            <article className='prose mt-4 dark:prose-invert'>
              <p>{t.contactMe}</p>
            </article>
          </div>
        </section>
      </main>
    </Layout>
  );
}

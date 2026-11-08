import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FaXTwitter } from 'react-icons/fa6';
import { SiLinkedin } from 'react-icons/si';

import { trackEvent } from '@/lib/analytics';

import Accent from '@/components/Accent';
import UnstyledLink from '@/components/links/UnstyledLink';
import Mascot from '@/components/Mascot';

type SubscribeCardProps = {
  className?: string;
  title?: string;
  description?: string;
  lang?: 'es' | 'en';
};

export default function SubscribeCard({
  className,
  title,
  description,
  lang,
}: SubscribeCardProps) {
  const router = useRouter();
  const isEnglish =
    lang === 'en' ||
    (!lang &&
      ((router.asPath || '').includes('/en-') ||
        (router.asPath || '').startsWith('/en/') ||
        router.query.lang === 'en'));

  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-[20px] border border-[#cbcfe0] bg-white p-6 shadow-sm dark:border-[#262f6e] dark:bg-[#0a0d24]/90 sm:p-8',
        className
      )}
    >
      <div className='flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex-1'>
          <div className='inline-flex items-center gap-2 rounded-full border border-[#00f5d4]/40 bg-[#00f5d4]/10 px-3 py-0.5 font-mono text-[11px] font-semibold text-[#0f766e] dark:text-[#00f5d4]'>
            <span>
              {isEnglish
                ? '✦ FEEDBACK & DISCUSSION'
                : '✦ FEEDBACK & CONVERSACIÓN'}
            </span>
          </div>

          <h3 className='mt-2.5 text-xl font-bold sm:text-2xl'>
            <Accent>
              {title ??
                (isEnglish
                  ? 'Questions or want to discuss this topic?'
                  : '¿Tienes dudas o quieres debatir sobre este tema?')}
            </Accent>
          </h3>

          <p className='mt-2 max-w-xl text-sm leading-relaxed text-[#586094] dark:text-[#b6bddb] sm:text-base'>
            {description ??
              (isEnglish
                ? 'I regularly share technical breakdowns, AI architectures, and answer questions. Reach out and let’s chat!'
                : 'Suelo compartir reflexiones técnicas, arquitecturas de IA y resolver dudas a diario. Escríbeme y charlamos sobre el artículo.')}
          </p>

          <div className='mt-5 flex flex-wrap items-center gap-3'>
            <UnstyledLink
              href='https://twitter.com/pedromebo'
              onClick={() =>
                trackEvent('Feedback Card: Twitter', { type: 'link' })
              }
              className='inline-flex items-center gap-2 rounded-[10px] border border-[#ff2e93] bg-[#ff2e93] px-4 py-2 font-mono text-xs font-bold text-[#111638] shadow-[0_4px_14px_rgba(255,46,147,0.3)] transition-all hover:-translate-y-0.5'
            >
              <FaXTwitter className='h-4 w-4' />
              <span>
                {isEnglish ? 'Discuss on X (@pedromebo)' : 'Debatir en X (@pedromebo)'}
              </span>
            </UnstyledLink>

            <UnstyledLink
              href='https://www.linkedin.com/in/pedromebo/'
              onClick={() =>
                trackEvent('Feedback Card: LinkedIn', { type: 'link' })
              }
              className='inline-flex items-center gap-2 rounded-[10px] border border-[#cbcfe0] bg-[#eff0f7] px-4 py-2 font-mono text-xs font-bold text-[#111638] transition-all hover:-translate-y-0.5 dark:border-[#262f6e] dark:bg-[#111638] dark:text-white dark:hover:border-[#00f5d4]'
            >
              <SiLinkedin className='h-4 w-4 text-[#00b89c] dark:text-[#00f5d4]' />
              <span>
                {isEnglish ? 'Connect on LinkedIn' : 'Conectar en LinkedIn'}
              </span>
            </UnstyledLink>
          </div>
        </div>

        <div className='hidden shrink-0 sm:block'>
          <Mascot
            pose='coffee'
            mode='sticker'
            size='xs'
            className='max-w-[100px]'
          />
        </div>
      </div>
    </div>
  );
}

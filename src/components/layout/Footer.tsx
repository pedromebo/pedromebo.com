import { useRouter } from 'next/router';
import * as React from 'react';
import { FaXTwitter } from 'react-icons/fa6';
import { FiMail } from 'react-icons/fi';
import { IconType } from 'react-icons/lib';
import { SiGithub, SiLinkedin } from 'react-icons/si';

import { trackEvent } from '@/lib/analytics';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';

import Accent from '@/components/Accent';
import CustomLink from '@/components/links/CustomLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Mascot from '@/components/Mascot';
import Tooltip from '@/components/Tooltip';

export default function Footer() {
  const router = useRouter();
  const path = (router.asPath || '/').split('?')[0];
  const isEnglish =
    path === '/en' ||
    path.startsWith('/en/') ||
    path.includes('/en-') ||
    router.query.lang === 'en';

  return (
    <footer className='mt-8 pb-4'>
      <main className='layout flex flex-col items-center border-t border-[#cbcfe0] pt-8 dark:border-[#262f6e]'>
        <div className='flex flex-col items-center gap-2'>
          <Mascot
            pose='contact'
            mode='sticker'
            size='sm'
            className='-mb-1 max-w-[110px]'
          />
          <p className='font-mono text-sm font-semibold tracking-wide text-[#586094] dark:text-[#00f5d4]'>
            {isEnglish
              ? 'Want to talk about AI or projects?'
              : '¿Hablamos de proyectos o IA?'}
          </p>
        </div>
        <SocialLinks isEnglish={isEnglish} />
        <p className='mt-8 text-center text-sm text-[#586094] dark:text-[#b6bddb]'>
          © Pedromebo {new Date().getFullYear()}
          <br />
          <CustomLink href='https://github.com/pedromebo/pedromebo.com'>
            My Source Code
          </CustomLink>
        </p>
      </main>
    </footer>
  );
}

function SocialLinks({ isEnglish = false }: { isEnglish?: boolean }) {
  const [copyStatus, setCopyStatus] = React.useState<'idle' | 'copied'>('idle');

  const [copy] = useCopyToClipboard();

  return (
    <div className='mt-2 flex space-x-4'>
      <div className='flex items-center justify-center'>
        <Tooltip
          trigger='mouseenter'
          hideOnClick={false}
          interactive
          html={
            <div className='inline-block rounded-md border border-[#cbcfe0] bg-white p-2 text-[#586094] shadow-md dark:border-[#262f6e] dark:bg-[#0a0d24] dark:text-[#b6bddb]'>
              {copyStatus === 'idle'
                ? isEnglish
                  ? 'Click the mail icon to copy '
                  : 'Haz click en el icono del correo para copiar '
                : isEnglish
                ? 'Copied to clipboard 🥳 '
                : 'Copiado al portapapeles🥳 '}
              <Accent className='inline-block font-medium'>
                contacto@pedromebo.com
              </Accent>
            </div>
          }
        >
          <button
            onClick={() => {
              copy('contacto@pedromebo.com').then(() => {
                setCopyStatus('copied');
                trackEvent('Footer Contact: Copy Email', { type: 'link' });
                setTimeout(() => setCopyStatus('idle'), 1500);
              });
            }}
            className='rounded-sm align-middle focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
            aria-label='Copiar correo contacto@pedromebo.com'
          >
            <FiMail className='h-7 w-7 align-middle text-[#586094] hover:text-primary-300 dark:text-[#b6bddb] dark:hover:text-primary-300' />
          </button>
        </Tooltip>
      </div>
      {socials.map((social) => (
        <Tooltip
          interactive={false}
          key={social.href}
          tipChildren={social.text}
        >
          <UnstyledLink
            className='inline-flex items-center justify-center rounded-sm focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
            href={social.href}
            onClick={() => {
              trackEvent(`Footer Link: ${social.id}`, { type: 'link' });
            }}
          >
            <social.icon className='my-auto h-6 w-6 align-middle text-[#586094] transition-colors hover:text-primary-300 dark:text-[#b6bddb] dark:hover:text-primary-300' />
          </UnstyledLink>
        </Tooltip>
      ))}
    </div>
  );
}

type Social = {
  href: string;
  icon: IconType;
  id: string;
  text: React.ReactNode;
};
const socials: Social[] = [
  {
    href: 'https://github.com/pedromebo',
    icon: SiGithub,
    id: 'Github',
    text: (
      <>
        Mira mis proyectos en <Accent className='font-medium'>Github</Accent>
      </>
    ),
  },
  {
    href: 'https://www.linkedin.com/in/pedromebo/',
    icon: SiLinkedin,
    id: 'Linkedin',
    text: (
      <>
        Encuéntrame en <Accent className='font-medium'>Linkedin</Accent>
      </>
    ),
  },
  {
    href: 'https://twitter.com/pedromebo',
    icon: FaXTwitter,
    id: 'Twitter',
    text: (
      <>
        Subo actualizaciones, tips, estadísticas y noticias. Sígueme en{' '}
        <Accent className='font-medium'>Twitter</Accent>!
      </>
    ),
  },
];

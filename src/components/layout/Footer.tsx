import * as React from 'react';
import { FiMail } from 'react-icons/fi';
import { IconType } from 'react-icons/lib';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import {FaXTwitter} from 'react-icons/fa6';

import { trackEvent } from '@/lib/analytics';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';

import Accent from '@/components/Accent';
import UnstyledLink from '@/components/links/UnstyledLink';
import Tooltip from '@/components/Tooltip';
import CustomLink from '@/components/links/CustomLink';


export default function Footer() {
  return (
    <footer className='mt-4 pb-2'>
      <main className='layout flex flex-col items-center border-t pt-6 dark:border-gray-600'>
        <p className='mt-2 font-medium text-gray-600 dark:text-gray-300'>
          Contáctame
        </p>
        <SocialLinks />
        <p className='mt-8 text-sm text-gray-600 dark:text-gray-300 text-center'>
          © Pedromebo {new Date().getFullYear()}<br />
          <CustomLink href='https://github.com/pedromebo/pedromebo.com'>My Source Code</CustomLink>
        </p>
      </main>
    </footer>
  );
}

function SocialLinks() {
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
            <div className='inline-block rounded-md border bg-white p-2 text-gray-600 shadow-md dark:border-gray-600 dark:bg-dark dark:text-gray-200'>
              {copyStatus === 'idle'
                ? 'Haz click en el icono del correo para copiar '
                : 'Copiado al portapapeles🥳'}
              <Accent className='inline-block font-medium'>
                contacto@pedromebo.com
              </Accent>
            </div>
          }
        >
          <button
            onClick={() => {
              copy('contact@pedromebo.com').then(() => {
                setCopyStatus('copied');
                setTimeout(() => setCopyStatus('idle'), 1500);
              });
            }}
            className='rounded-sm align-middle focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
          >
            <FiMail className='h-7 w-7 align-middle text-gray-600 hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300' />
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
            <social.icon className='my-auto h-6 w-6 align-middle text-gray-600 transition-colors hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300' />
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
        Encuentrame en <Accent className='font-medium'>Linkedin</Accent>
      </>
    ),
  },
  {
    href: 'https://twitter.com/pedromebo',
    icon: FaXTwitter,
    id: 'Twitter',
    text: (
      <>
        Subo actualizaciones, tips, estadísticas y noticias. Sigueme en{' '}
        <Accent className='font-medium'>Twitter</Accent>!
      </>
    ),
  },
];

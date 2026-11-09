import clsx from 'clsx';
import * as React from 'react';
import { FaXTwitter } from 'react-icons/fa6';

import ButtonLink, { ButtonLinkProps } from '@/components/links/ButtonLink';

type ShareTweetButtonProps = {
  url: string;
  title: string;
  lang?: 'es' | 'en';
} & Omit<ButtonLinkProps, 'children' | 'href'>;

export default function ShareTweetButton({
  url,
  title,
  lang,
  className,
  ...rest
}: ShareTweetButtonProps) {
  const isEnglish = lang === 'en' || (!lang && url.includes('/en-'));
  const text = isEnglish
    ? `I just read "${title}" by @pedromebo.`
    : `Acabo de leer un artículo sobre ${title} por @pedromebo.`;
  const intentUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(text)}%0A%0A`;

  return (
    <ButtonLink
      {...rest}
      href={intentUrl}
      className={clsx('items-center gap-2', className)}
    >
      <FaXTwitter className='text-[1.2em]' />
      {isEnglish ? 'Share this article on X' : 'Pon un Post de este artículo'}
    </ButtonLink>
  );
}

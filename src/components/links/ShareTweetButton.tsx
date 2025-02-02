import clsx from 'clsx';
import * as React from 'react';
import {FaXTwitter} from 'react-icons/fa6';

import ButtonLink, { ButtonLinkProps } from '@/components/links/ButtonLink';

type ShareTweetButtonProps = {
  url: string;
  title: string;
} & Omit<ButtonLinkProps, 'children' | 'href'>;

export default function ShareTweetButton({
  url,
  title,
  className,
  ...rest
}: ShareTweetButtonProps) {
  const text = `Acabo de leer un artículo sobre ${title} por @pedromebo.`;
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
      Pon un Post de este artículo
    </ButtonLink>
  );
}

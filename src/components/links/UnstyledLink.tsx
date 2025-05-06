import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import { UrlObject } from 'url';

type Url = string | UrlObject;

export type UnstyledLinkProps = {
  href?: Url;
  children?: React.ReactNode;
  openNewTab?: boolean;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<'a'>, 'href'>;

export default function UnstyledLink({
  children = null,
  href = '#',
  openNewTab,
  className,
  ...rest
}: UnstyledLinkProps) {
  const isNewTab =
    openNewTab !== undefined
      ? openNewTab
      : typeof href === 'string' && href && !href.startsWith('/') && !href.startsWith('#');

  if (!isNewTab) {
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href={typeof href === 'string' ? href : href.toString()}
      {...rest}
      className={clsx(className, 'cursor-newtab')}
    >
      {children}
    </a>
  );
}

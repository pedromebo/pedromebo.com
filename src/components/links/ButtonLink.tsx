import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import UnstyledLink, { UnstyledLinkProps } from './UnstyledLink';

enum ButtonVariant {
  'default',
}

export type ButtonLinkProps = {
  variant?: keyof typeof ButtonVariant;
} & UnstyledLinkProps;

export default function ButtonLink({
  children,
  className = '',
  variant = 'default',
  ...rest
}: ButtonLinkProps) {
  return (
    <UnstyledLink
      {...rest}
      className={twMerge(
        clsx(
          'inline-flex rounded px-4 py-2 font-bold',
          'border border-[#cbcfe0] shadow-sm dark:border-[#262f6e]',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-300',
          'scale-100 hover:scale-[1.03] active:scale-[0.97] motion-safe:transform-gpu',
          'motion-reduce:hover:scale-100 motion-reduce:hover:brightness-90',
          'transition duration-100',
          'animate-shadow',
          {
            'bg-white text-[#111638] disabled:bg-[#e5e7eb] dark:bg-[#0a0d24] dark:text-white dark:disabled:bg-[#282f59]':
              variant === 'default',
          },
          className
        )
      )}
    >
      {children}
    </UnstyledLink>
  );
}

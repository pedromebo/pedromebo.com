import clsx from 'clsx';
import * as React from 'react';

type TagProps = {
  active?: boolean;
} & React.ComponentPropsWithoutRef<'button'>;

export default function Tag({
  children,
  className,
  active = false,
  ...rest
}: TagProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center rounded-md px-2.5 py-1 font-mono text-xs font-semibold transition-all',
        active
          ? 'bg-[#00f5d4] text-[#0a0d24] shadow-[0_0_12px_rgba(0,245,212,0.35)] font-bold'
          : 'bg-[#eff0f7] text-[#111638] hover:bg-[#e2e4ef] dark:bg-[#111638] dark:text-[#b6bddb] dark:hover:bg-[#1b2254] dark:hover:text-white border border-transparent dark:border-[#262f6e]/60',
        'disabled:opacity-35 disabled:cursor-not-allowed',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f5d4]',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function SkipNavTag({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<'a'>) {
  return (
    <>
      <a
        href='#skip-tags'
        className={clsx(
          'inline-block rounded-md px-2 py-0.5 font-medium transition',
          'bg-[#eff0f7] text-[#111638] hover:text-black disabled:bg-[#e5e7eb] disabled:text-[#b6bddb]',
          'dark:bg-[#111638] dark:text-[#b6bddb] dark:hover:text-white dark:disabled:bg-[#0a0d24] dark:disabled:text-[#282f59]',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f5d4] disabled:cursor-not-allowed',
          'pointer-events-none absolute opacity-0 focus:inline-block focus:translate-y-[1.4rem] focus:opacity-100'
        )}
        {...rest}
      >
        Skip tag
      </a>
      {children}
      <div id='skip-tags' className='hidden' />
    </>
  );
}

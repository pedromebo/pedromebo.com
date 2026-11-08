import clsx from 'clsx';
import * as React from 'react';

import Accent from '@/components/Accent';
import Tag from '@/components/content/Tag';
import UnstyledLink from '@/components/links/UnstyledLink';

import { InjectedMeta, LibraryFrontmatter } from '@/types/frontmatters';

type ShortsCardProps = {
  short: LibraryFrontmatter & InjectedMeta;
  checkTagged?: (tag: string) => boolean;
} & React.ComponentPropsWithoutRef<'li'>;

export default function ShortsCard({
  className,
  checkTagged,
  short,
}: ShortsCardProps) {
  return (
    <li
      className={clsx([
        'ring-vis-0 h-full rounded-md bg-white dark:bg-[#0a0d24]',
        'border border-[#cbcfe0] dark:border-[#262f6e]',
        'scale-100 hover:scale-[1.04] active:scale-[0.97] motion-safe:transform-gpu',
        'transition duration-100',
        'motion-reduce:hover:scale-100',
        'animate-shadow',
        className,
      ])}
    >
      <UnstyledLink
        href={`/shorts/${short.slug}`}
        className='block h-full rounded-md focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
      >
        <div className='p-4'>
          <h4 className='font-semibold tracking-tight text-[#111638] dark:text-white'>
            {short.title}
          </h4>

          <div className='mt-2 flex flex-wrap gap-x-1 gap-y-1 text-sm text-[#111638] dark:text-white'>
            {short.tags.split(',').map((tag) => (
              <Tag
                tabIndex={-1}
                className='bg-opacity-80 dark:!bg-opacity-60'
                key={tag}
              >
                {checkTagged?.(tag) ? <Accent>{tag}</Accent> : tag}
              </Tag>
            ))}
          </div>
          <p className='mt-4 text-sm text-[#586094] dark:text-[#b6bddb]'>
            {short.description}
          </p>
        </div>
      </UnstyledLink>
    </li>
  );
}

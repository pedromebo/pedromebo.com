import clsx from 'clsx';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import * as React from 'react';
import { HiOutlineClock } from 'react-icons/hi';

import CloudinaryImg from '@/components/images/CloudinaryImg';
import UnstyledLink from '@/components/links/UnstyledLink';

import { BlogFrontmatter, InjectedMeta } from '@/types/frontmatters';

type BlogCardProps = {
  post: BlogFrontmatter & InjectedMeta;
  checkTagged?: (tag: string) => boolean;
} & React.ComponentPropsWithoutRef<'li'>;

export default function BlogCard({
  post,
  className,
  checkTagged,
  onClick,
}: BlogCardProps) {
  const isPostSpanish = !post.slug.startsWith('en-');

  return (
    <li
      className={clsx(
        'group w-full rounded-[16px] overflow-hidden',
        'border border-[#cbcfe0] bg-white dark:border-[#262f6e] dark:bg-[#0a0d24]',
        'scale-100 hover:scale-[1.02] active:scale-[0.98] motion-safe:transform-gpu',
        'transition duration-200 shadow-sm hover:shadow-md hover:border-[#00f5d4]/80 dark:hover:border-[#00f5d4]/70',
        className
      )}
      onClick={onClick}
    >
      <UnstyledLink
        className='flex h-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f5d4]'
        href={`/blog/${post.slug}`}
      >
        <div className='relative overflow-hidden'>
          <CloudinaryImg
            noStyle
            className='pointer-events-none w-full overflow-hidden rounded-t-[14px]'
            publicId={`pedromebo/banner/${post.banner}`}
            alt='Banner photo'
            width={1200}
            height={(1200 * 2) / 5}
            aspect={{ height: 2, width: 5 }}
          />
          <div className='absolute bottom-2 right-2 flex flex-wrap justify-end gap-1.5'>
            {post.tags
              .split(',')
              .slice(0, 3)
              .map((tag) => (
                <span
                  key={tag}
                  className={clsx(
                    'rounded px-2 py-0.5 font-mono text-[10px] font-bold backdrop-blur-md transition-colors',
                    checkTagged?.(tag)
                      ? 'bg-[#00f5d4] text-[#0a0d24]'
                      : 'bg-[#0a0d24]/85 text-[#00f5d4] border border-[#262f6e]'
                  )}
                >
                  #{tag.trim()}
                </span>
              ))}
          </div>
        </div>

        <div className='flex flex-1 flex-col p-5'>
          <div className='mb-2 flex items-center justify-between text-xs text-[#586094] dark:text-[#b6bddb]'>
            <span>
              {format(
                new Date(post.lastUpdated ?? post.publishedAt),
                isPostSpanish ? "dd 'de' MMMM, yyyy" : 'MMMM dd, yyyy',
                isPostSpanish ? { locale: es } : undefined
              )}
            </span>
            <div className='flex items-center gap-1 font-mono text-[11px] font-medium text-[#596dff] dark:text-[#00f5d4]'>
              <HiOutlineClock className='text-sm' />
              <span>
                {isPostSpanish
                  ? post.readingTime.text
                      .replace('min read', 'min')
                      .replace('read', 'lectura')
                  : post.readingTime.text}
              </span>
            </div>
          </div>

          <h4 className='line-clamp-2 text-base font-bold text-[#111638] transition-colors group-hover:text-[#596dff] sm:text-lg dark:text-white dark:group-hover:text-[#00f5d4]'>
            {post.title}
          </h4>

          <p className='mt-2 mb-4 line-clamp-2 text-xs leading-relaxed text-[#586094] sm:text-sm dark:text-[#b6bddb]'>
            {post.description}
          </p>

          <div className='mt-auto flex items-center justify-between border-t border-[#cbcfe0]/60 pt-3 dark:border-[#262f6e]'>
            <span className='font-mono text-[11px] font-semibold text-[#586094] dark:text-[#b6bddb]'>
              Pedro Medinilla
            </span>
            <span className='font-mono text-xs font-bold text-[#596dff] transition-transform group-hover:translate-x-1 dark:text-[#00f5d4]'>
              {isPostSpanish ? 'Leer artículo →' : 'Read article →'}
            </span>
          </div>
        </div>
      </UnstyledLink>
    </li>
  );
}

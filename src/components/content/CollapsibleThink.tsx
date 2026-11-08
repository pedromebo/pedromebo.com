import clsx from 'clsx';
import * as React from 'react';
import { HiChevronDown, HiSparkles } from 'react-icons/hi';

type CollapsibleThinkProps = {
  title?: string;
  badge?: string;
  lang?: 'es' | 'en';
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
};

export default function CollapsibleThink({
  title = 'Pensamiento / Chain of Thought',
  badge,
  lang = 'es',
  defaultOpen = false,
  children,
  className,
}: CollapsibleThinkProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(defaultOpen);
  const isEs = lang === 'es';

  return (
    <div
      className={clsx(
        'my-5 w-full max-w-full overflow-hidden rounded-xl border transition-all duration-200 shadow-sm',
        'border-[#cbcfe0] bg-[#f8f9fc] dark:border-[#262f6e] dark:bg-[#0d1236]/90',
        isOpen
          ? 'border-[#596dff] dark:border-[#00f5d4]/60'
          : 'hover:border-[#596dff]/60 dark:hover:border-[#00f5d4]/50',
        className
      )}
    >
      <button
        type='button'
        onClick={() => setIsOpen((prev) => !prev)}
        className='flex w-full items-center justify-between px-4 py-3 text-left font-mono text-xs font-semibold text-[#111638] transition-colors hover:bg-[#edf0fa] dark:text-[#00f5d4] dark:hover:bg-[#111638]/70'
      >
        <span className='flex flex-wrap items-center gap-2'>
          <HiSparkles className='h-4 w-4 shrink-0 text-[#596dff] dark:text-[#00f5d4]' />
          <span className='font-bold'>{title}</span>
          {badge && (
            <span className='rounded-full border border-[#00f5d4]/40 bg-[#00f5d4]/10 px-2 py-0.5 text-[10px] text-[#0f766e] dark:text-[#00f5d4]'>
              {badge}
            </span>
          )}
        </span>
        <div className='flex items-center gap-1.5 shrink-0 ml-2'>
          <span className='text-[11px] font-normal text-[#586094] dark:text-[#8890be]'>
            {isOpen
              ? isEs
                ? 'Ocultar'
                : 'Hide'
              : isEs
              ? 'Ver pensamiento'
              : 'View thinking'}
          </span>
          <HiChevronDown
            className={clsx(
              'h-4 w-4 text-[#586094] transition-transform duration-200 dark:text-[#00f5d4]',
              isOpen && 'rotate-180'
            )}
          />
        </div>
      </button>

      {isOpen && (
        <div className='border-t border-[#cbcfe0] bg-white p-3 sm:p-4 text-xs leading-relaxed text-[#111638] dark:border-[#262f6e]/70 dark:bg-[#060817] dark:text-[#b6bddb] overflow-x-auto [&>*:first-child]:mt-0 [&>*:last-child]:mb-0'>
          {children}
        </div>
      )}
    </div>
  );
}

import * as React from 'react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';

import TOCLink from '@/components/links/TOCLink';

export type HeadingScrollSpy = Array<{
  id: string;
  level: number;
  text: string;
}>;

type TableOfContentsProps = {
  toc?: HeadingScrollSpy;
  activeSection: string | null;
  minLevel: number;
};

export default function TableOfContents({
  toc,
  activeSection,
  minLevel,
}: TableOfContentsProps) {
  //#region  //*=========== Scroll into view ===========
  const lastPosition = React.useRef<number>(0);

  React.useEffect(() => {
    const container = document.getElementById('toc-container');
    const activeLink = document.getElementById(`link-${activeSection}`);

    if (container && activeLink) {
      // Get container properties
      const cTop = container.scrollTop;
      const cBottom = cTop + container.clientHeight;

      // Get activeLink properties
      const lTop = activeLink.offsetTop - container.offsetTop;
      const lBottom = lTop + activeLink.clientHeight;

      // Check if in view
      const isTotal = lTop >= cTop && lBottom <= cBottom;

      const isScrollingUp = lastPosition.current > window.scrollY;
      lastPosition.current = window.scrollY;

      if (!isTotal) {
        // Scroll by the whole clientHeight
        const offset = 25;
        const top = isScrollingUp
          ? lTop - container.clientHeight + offset
          : lTop - offset;

        container.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }, [activeSection]);
  //#endregion  //*======== Scroll into view ===========

  if (!toc || toc.length === 0) return null;

  return (
    <div
      id='toc-container'
      className='hidden max-h-[calc(100vh-9rem-113px)] overflow-auto rounded-[16px] border border-[#cbcfe0] bg-white/70 p-4 backdrop-blur-md dark:border-[#262f6e] dark:bg-[#0a0d24]/80 lg:block'
    >
      <div className='flex items-center gap-2 border-b border-[#cbcfe0]/60 pb-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#111638] dark:border-[#262f6e] dark:text-[#00f5d4]'>
        <HiOutlineMenuAlt2 className='h-4 w-4 text-[#ff2e93]' />
        <span>Índice del post</span>
      </div>
      <nav className='mt-3.5 flex flex-col space-y-2.5 border-l-2 border-[#cbcfe0]/40 pl-2 dark:border-[#262f6e]'>
        {toc.map(({ id, level, text }) => (
          <TOCLink
            id={id}
            key={id}
            activeSection={activeSection}
            level={level}
            minLevel={minLevel}
            text={text}
          />
        ))}
      </nav>
    </div>
  );
}

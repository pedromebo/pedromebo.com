import clsx from 'clsx';
import * as React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';

type TOCLinkProps = {
  id: string;
  level: number;
  minLevel: number;
  text: string;
  activeSection: string | null;
};

export default function TOCLink({
  id,
  level,
  minLevel,
  text,
  activeSection,
}: TOCLinkProps) {
  const isActive = activeSection === id;

  return (
    <UnstyledLink
      href={`#${id}`}
      id={`link-${id}`}
      className={clsx(
        'block text-xs leading-relaxed transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f5d4]',
        isActive
          ? 'font-bold text-[#596dff] dark:text-[#00f5d4] border-l-2 border-[#596dff] dark:border-[#00f5d4] pl-2 -ml-[9px]'
          : 'font-medium text-[#586094] dark:text-[#8890b5] hover:text-[#111638] dark:hover:text-[#00f5d4]'
      )}
      style={{ marginLeft: (level - minLevel) * 12 }}
    >
      {text}
    </UnstyledLink>
  );
}

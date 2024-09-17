import clsx from 'clsx';
import * as React from 'react';
import {
  SiPython,
  SiGnubash,
} from 'react-icons/si';
import { FaJava } from "react-icons/fa";
import { TbBrandCpp, TbFileTypeSql } from "react-icons/tb";

import CustomLink from '@/components/links/CustomLink';
import Tooltip from '@/components/Tooltip';

import translations from '@/constants/translations/techStack';

export default function TechStackLanguages({ isSpanish }: { isSpanish: boolean }) {
  const t = isSpanish ? translations.es : translations.en;

  const stacks = [
    {
      id: 'python',
      icon: SiPython,
      tooltip: (
        <>
          <CustomLink href='https://www.python.org/'>Python</CustomLink>, {t.pythonDesc}
        </>
      ),
      tech_type: 'language',
    },
    {
      id: 'java',
      icon: FaJava,
      tooltip: (
        <>
          <CustomLink href='https://www.java.com/'>Java</CustomLink>, {t.javaDesc}
        </>
      ),
      tech_type: 'language',
    },
    {
      id: 'C++',
      icon: TbBrandCpp,
      tooltip: (
        <>
          <CustomLink href='https://isocpp.org/'>C++</CustomLink>, {t.cppDesc}
        </>
      ),
      tech_type: 'language',
    },
    {
      id: 'SQL',
      icon: TbFileTypeSql,
      tooltip: (
        <>
          <CustomLink href='https://www.sql.org/'>SQL</CustomLink>, {t.sqlDesc}
        </>
      ),
      tech_type: 'language',
    },
    {
      id: 'Bash',
      icon: SiGnubash,
      tooltip: (
        <>
          <CustomLink href='https://www.gnu.org/software/bash/'>Bash</CustomLink>, {t.bashDesc}
        </>
      ),
      tech_type: 'language',
    }
  ];

  return (
    <div className='flex space-x-2 md:space-x-4'>
      {stacks.map((tech) => (
        <Tooltip key={tech.id} tipChildren={<p>{tech.tooltip}</p>}>
          <tech.icon
            key={tech.id}
            className={clsx(
              'h-8 w-8 md:h-10 md:w-10',
              'text-gray-600 hover:text-primary-300 dark:text-gray-200 dark:hover:text-primary-300',
              'transition-colors'
            )}
          />
        </Tooltip>
      ))}
    </div>
  );
}

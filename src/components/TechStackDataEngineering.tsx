import clsx from 'clsx';
import * as React from 'react';
import {
  SiApacheairflow,
  SiApachespark,
} from 'react-icons/si';

import CustomLink from '@/components/links/CustomLink';
import Tooltip from '@/components/Tooltip';
import translations from '@/constants/translations/techStack';

export default function TechStackDataEngineering({ isSpanish }: { isSpanish: boolean }) {
  const t = isSpanish ? translations.es : translations.en;

  const stacks = [
    {
      id: 'apache_spark',
      icon: SiApachespark,
      tooltip: (
        <>
          <CustomLink href='https://spark.apache.org/'>Apache Spark</CustomLink>, {t.sparkDesc}
        </>
      ),
      tech_type: 'data',
    },
    {
      id: 'apache_airflow',
      icon: SiApacheairflow,
      tooltip: (
        <>
          <CustomLink href='https://airflow.apache.org/'>Apache Airflow</CustomLink>, {t.airflowDesc}
        </>
      ),
      tech_type: 'data',
    },
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

import clsx from 'clsx';
import * as React from 'react';

import CloudinaryImg from '@/components/images/CloudinaryImg';
import UnstyledLink from '@/components/links/UnstyledLink';
import TechIcons, { TechListType } from '@/components/TechIcons';

import { ProjectFrontmatter } from '@/types/frontmatters';

type ProjectCardProps = {
  project: ProjectFrontmatter;
} & React.ComponentPropsWithoutRef<'li'>;

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const isEn = project.slug.startsWith('en-');
  return (
    <li
      className={clsx(
        'project-card w-full rounded-[16px] overflow-hidden',
        'border border-[#cbcfe0] bg-white dark:border-[#262f6e] dark:bg-[#0a0d24]',
        'scale-100 hover:scale-[1.02] active:scale-[0.98] motion-safe:transform-gpu',
        'transition duration-200 shadow-sm hover:shadow-md hover:border-[#00f5d4]/80 dark:hover:border-[#00f5d4]/70',
        className
      )}
    >
      <UnstyledLink
        href={`/projects/${project.slug}`}
        className='flex h-full flex-col focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
      >
        {/* Banner on Top */}
        <div className='relative overflow-hidden'>
          <CloudinaryImg
            noStyle
            className='pointer-events-none w-full overflow-hidden rounded-t-[14px]'
            publicId={
              project.banner.startsWith('/') || project.banner.startsWith('http')
                ? project.banner
                : `pedromebo/${project.banner}`
            }
            alt={project.title}
            width={1440}
            height={792}
            aspect={{ height: 792, width: 1440 }}
          />
          {project.category && (
            <span className='absolute bottom-3 left-3 rounded-md bg-[#0a0d24]/90 px-2.5 py-1 font-mono text-[10px] font-bold text-[#00f5d4] backdrop-blur-sm border border-[#262f6e]'>
              {project.category}
            </span>
          )}
        </div>

        {/* Card Body */}
        <div className='flex flex-1 flex-col p-5'>
          <h4 className='text-base font-bold text-[#111638] dark:text-white sm:text-lg'>
            {project.title}
          </h4>

          <p className='mt-2 mb-4 text-xs leading-relaxed text-[#586094] dark:text-[#b6bddb] sm:text-sm line-clamp-2'>
            {project.description}
          </p>

          <div className='mt-auto flex items-center justify-between gap-3 border-t border-[#cbcfe0]/60 pt-3 dark:border-[#262f6e]'>
            <TechIcons techs={project.techs.split(',') as Array<TechListType>} />
            <span className='font-mono text-xs font-bold text-[#596dff] dark:text-[#00f5d4] group-hover:translate-x-1 transition-transform'>
              {isEn ? 'View project →' : 'Ver proyecto →'}
            </span>
          </div>
        </div>
      </UnstyledLink>
    </li>
  );
}

import clsx from 'clsx';
import * as React from 'react';
import {FaXTwitter} from 'react-icons/fa6';

import {
  SiPython,
  SiCplusplus,
  SiDocker,
  SiAmazonaws,
  SiTwitch,
  SiVisualstudio,
  SiOpengl,
  SiGit,
  SiUnrealengine,
  SiFmod
} from 'react-icons/si';

import Tooltip from '@/components/Tooltip';

export type TechListType = keyof typeof techList;

export type TechIconsProps = {
  techs: Array<TechListType>;
} & React.ComponentPropsWithoutRef<'ul'>;

export default function TechIcons({ className, techs }: TechIconsProps) {
  return (
    <ul className={clsx(className, 'flex gap-2')}>
      {techs.map((tech) => {
        if (!techList[tech]) return;

        const current = techList[tech];

        return (
          <Tooltip key={current.name} tipChildren={<p>{current.name}</p>}>
            <li className='text-xl text-gray-700 dark:text-gray-200'>
              <current.icon />
            </li>
          </Tooltip>
        );
      })}
    </ul>
  );
}

const techList = {
  python: {
    icon: SiPython,
    name: 'Python'
  },
  cplusplus: {
    icon: SiCplusplus,
    name: 'C++'
  },
  docker: {
    icon: SiDocker,
    name: 'Docker'
  },
  amazonaws: {
    icon: SiAmazonaws,
    name: 'AWS'
  },
  twitch: {
    icon: SiTwitch,
    name: 'Twitch'
  },
  twitter: {
    icon: FaXTwitter,
    name: 'Twitter'
  },
  visualstudio: {
    icon: SiVisualstudio,
    name: 'Visual Studio'
  },
  opengl: {
    icon: SiOpengl,
    name: 'OpenGL'
  },
  git: {
    icon: SiGit,
    name: 'Git',
  },
  cpp: {
    icon: SiCplusplus,
    name: 'C++'
  },
  unrealengine: {
    icon: SiUnrealengine,
    name: 'Unreal Engine'
  },
  fmod: {
    icon: SiFmod,
    name: 'FMOD'
  },
};

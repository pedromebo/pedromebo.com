import clsx from 'clsx';
import * as React from 'react';
import {
  SiPandas,
  SiScikitlearn,
  SiTensorflow,
  SiOpenai,
  SiNumpy,
  SiMlflow,
} from 'react-icons/si';

import CustomLink from '@/components/links/CustomLink';
import Tooltip from '@/components/Tooltip';
import translations from '@/constants/translations/techStack';

export default function TechStackAI({ isSpanish }: { isSpanish: boolean }) {
  const t = isSpanish ? translations.es : translations.en;

  const stacks = [
    {
      id: 'pandas',
      icon: SiPandas,
      tooltip: (
        <>
          <CustomLink href='https://pandas.pydata.org/'>Pandas</CustomLink>, {t.pandasDesc}
        </>
      ),
      tech_type: 'ai',
    },
    {
      id: 'numpy',
      icon: SiNumpy,
      tooltip: (
        <>
          <CustomLink href='https://numpy.org/'>NumPy</CustomLink>, {t.numpyDesc}
        </>
      ),
      tech_type: 'ai',
    },
    {
      id: 'Scikit-learn',
      icon: SiScikitlearn,
      tooltip: (
        <>
          <CustomLink href='https://scikit-learn.org/'>Scikit-learn</CustomLink>, {t.scikitLearnDesc}
        </>
      ),
      tech_type: 'ai',
    },
    {
      id: 'Tensorflow',
      icon: SiTensorflow,
      tooltip: (
        <>
          <CustomLink href='https://www.tensorflow.org/'>TensorFlow</CustomLink>, {t.tensorflowDesc}
        </>
      ),
      tech_type: 'ai',
    },
    {
      id: 'OpenAI',
      icon: SiOpenai,
      tooltip: (
        <>
          <CustomLink href='https://openai.com/'>OpenAI</CustomLink>, {t.openaiDesc}
        </>
      ),
      tech_type: 'ai',
    },
    {
      id: 'MLflow',
      icon: SiMlflow,
      tooltip: (
        <>
          <CustomLink href='https://mlflow.org/'>MLflow</CustomLink>, {t.mlflowDesc}
        </>
      ),
      tech_type: 'ai',
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
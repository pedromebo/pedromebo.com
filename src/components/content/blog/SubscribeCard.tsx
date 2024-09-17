import clsx from 'clsx';
import * as React from 'react';

import Accent from '@/components/Accent';
import ButtonLink from '@/components/links/ButtonLink';

type SubscribeCardProps = {
  className?: string;
  title?: string;
  description?: string;
};
export default function SubscribeCard({
  className,
  title,
  description,
}: SubscribeCardProps) {
  return (
    <div className={clsx('rounded border p-4 dark:border-gray-600', className)}>
      <h3>
        <Accent>{title ?? '¿Quieres contactar conmigo?'}</Accent>
      </h3>
      <p className='mt-2 text-gray-700 dark:text-gray-300'>
        {description ??
          "No dudes en contactarme si tienes alguna duda, sugerencia o proyecto que pueda ayudarte a hacerlo realidad."}
      </p>
      <ButtonLink
        className='mt-2'
        href='https://x.com/pedromebo'
      >
        Contactar
      </ButtonLink>
    </div>
  );
}

import clsx from 'clsx';
import * as React from 'react';

export default function StyledInput({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<'input'>) {
  return (
    <input
      className={clsx(
        className,
        'w-full rounded-md dark:bg-[#0a0d24]',
        'border border-[#cbcfe0] dark:border-[#262f6e]',
        'focus:border-primary-300 focus:outline-none focus:ring-0 dark:focus:border-primary-300'
      )}
      {...rest}
    />
  );
}

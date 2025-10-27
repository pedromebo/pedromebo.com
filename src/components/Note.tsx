import clsx from 'clsx';
import * as React from 'react';

interface NoteProps {
  title?: string;
  emoji?: string;
  className?: string;
  variant?: 'neutral' | 'info' | 'success' | 'danger';
  children: React.ReactNode;
}

export default function Note({
  title,
  emoji,
  className,
  variant = 'neutral',
  children,
}: NoteProps) {
  const hasEmoji = emoji && String(emoji).trim().length > 0;
  const hasTitle = title && String(title).trim().length > 0;

  return (
    <div className={clsx('note', `note--${variant}`, className)}>
      <div className='note__layout'>
        {hasEmoji && (
          <div className='note__icon' aria-hidden='true'>
            <span className='note__emoji'>{emoji}</span>
          </div>
        )}
        <div className='note__body'>
          {hasTitle && <div className='note__title'>{title}</div>}
          <div className='note__content'>{children}</div>
        </div>
      </div>
    </div>
  );
}


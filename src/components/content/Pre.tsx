import clsx from 'clsx';
import * as React from 'react';
import { BiCheck, BiCopy } from 'react-icons/bi';
import { BsTextWrap } from 'react-icons/bs';

import clsxm from '@/lib/clsxm';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';

// Define props for the component.
// Children are implicitly part of HTMLAttributes.
// ref is handled by React.forwardRef itself.
type PreProps = React.HTMLAttributes<HTMLPreElement>;

export const Pre = React.forwardRef<HTMLPreElement, PreProps>(
  ({ className, children, ...rest }, ref) => {
    const localPreRef = React.useRef<HTMLPreElement>(null);

    // Expose the localPreRef through the forwarded ref using useImperativeHandle
    React.useImperativeHandle(ref, () => localPreRef.current!);

    const [isCopied, setIsCopied] = React.useState<boolean>(false);
    const [shouldWrap, setShouldWrap] = React.useState(false);
    const [copy] = useCopyToClipboard();

    // Function to handle copying, using localPreRef
    const handleCopy = () => {
      if (localPreRef.current) {
        copy(localPreRef.current.textContent ?? '').then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 1500);
        });
      }
    };

    return (
      // word-break: break-word;
      // @apply nx-whitespace-pre-wrap md:nx-whitespace-pre;
      <pre
        {...rest}
        ref={localPreRef}
        className={clsxm([
          'group relative',
          // 'whitespace-pre-wrap break-words',
          className,
        ])}
        data-word-wrap={shouldWrap}
      >
        {children}
        <div
          className={clsx(
            'opacity-0 transition focus-within:opacity-100 group-hover:opacity-100',
            'absolute right-0 top-0 z-10 m-[11px] flex gap-1'
          )}
        >
          <button
            onClick={() => setShouldWrap((prev) => !prev)}
            title='Wrap code'
            className={clsx([
              'md:hidden',
              'rounded p-1 text-lg transition-colors md:block',
              'border border-gray-300 dark:border-gray-600',
              'text-gray-700 dark:text-gray-300',
              'bg-[#f2f7fc] hover:bg-gray-100 dark:bg-[#22272e] dark:hover:bg-gray-700',
            ])}
          >
            <BsTextWrap />
          </button>
          <button
            onClick={handleCopy}
            title='Copy code'
            className={clsx([
              'rounded p-1 text-lg transition-colors md:block',
              'border border-gray-300 dark:border-gray-600',
              'text-gray-700 dark:text-gray-300',
              'bg-[#f2f7fc] hover:bg-gray-100 dark:bg-[#22272e] dark:hover:bg-gray-700',
            ])}
          >
            {isCopied ? <BiCheck /> : <BiCopy />}
          </button>
        </div>
      </pre>
    );
  }
);
import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import * as React from 'react';
import { HiCheck, HiSelector } from 'react-icons/hi';
import { IconType } from 'react-icons/lib';

export type SortOption = {
  id: string;
  name: string;
  icon: IconType;
};

type SortListboxProps = {
  selected: SortOption;
  setSelected: React.Dispatch<React.SetStateAction<SortOption>>;
  options: SortOption[];
};

export default function SortListbox({
  selected,
  setSelected,
  options,
}: SortListboxProps) {
  return (
    <div className='w-full max-w-[200px]'>
      <Listbox value={selected} onChange={setSelected}>
        <div className='relative'>
          <Listbox.Button
            className={clsx(
              'w-full rounded-[8px] bg-white py-2 pl-3 pr-10 text-left font-medium text-[#111638] dark:bg-[#24208f] dark:text-white sm:text-sm',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f5d4]',
              'border border-[#cbcfe0] dark:border-[#596dff]/40',
              'scale-100 transform-gpu hover:scale-[1.03] active:scale-[0.97]',
              'transition duration-100',
              'animate-shadow'
            )}
          >
            <span className='block truncate'>
              <span className='inline-flex items-center gap-2'>
                <selected.icon className='text-[#596dff] dark:text-[#00f5d4]' />
                {selected.name}
              </span>
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <HiSelector
                className='h-5 w-5 text-[#586094] dark:text-[#b6bddb]'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
          <Transition
            as={React.Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-[8px] border border-[#cbcfe0] bg-white py-1 text-base shadow-lg focus:outline-none dark:border-[#262f6e] dark:bg-[#0a0d24] dark:shadow-none sm:text-sm'>
              {options.map((opt) => (
                <Listbox.Option
                  key={opt.id}
                  className={({ active }) =>
                    clsx(
                      'relative select-none py-2 pl-10 pr-4',
                      active
                        ? 'bg-[#00f5d4]/15 text-[#111638] dark:bg-[#00f5d4]/20 dark:text-[#00f5d4]'
                        : 'text-[#111638] dark:text-[#b6bddb]'
                    )
                  }
                  value={opt}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={clsx(
                          selected ? 'font-bold' : 'font-normal',
                          'block truncate'
                        )}
                      >
                        {opt.name}
                      </span>
                      {selected ? (
                        <span
                          className={clsx(
                            'absolute inset-y-0 left-0 flex items-center pl-3 text-[#24208f] dark:text-[#00f5d4]'
                          )}
                        >
                          <HiCheck className='h-5 w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

import { FC, Fragment, PropsWithChildren } from 'react'
import { Menu, Transition } from '@headlessui/react'

export const DropDown: FC<
  PropsWithChildren<{ open?: boolean; right?: boolean }>
> = ({ children, open, right }) => {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100'>
          Filter
          <svg
            className='-mr-1 ml-2 h-5 w-5'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
              clipRule='evenodd'
            />
          </svg>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items
          className={`absolute ${
            !open
              ? 'bottom-0 right-24 origin-bottom-left lg:bottom-[inherit] lg:right-0'
              : 'origin-top-right'
          } right-0 z-30 mt-2 w-42 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
            right
              ? ' origin-top-right w-[12vw] min-w-[210px] md:min-w-[22rem]'
              : 'md:w-[22vw]'
          }`}
        >
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

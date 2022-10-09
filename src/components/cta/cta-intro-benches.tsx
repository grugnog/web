import React from 'react'

export const CtaIntroBenches = () => {
  return (
    <div className='py-6'>
      <div className='flex-col flex text-center border-4 border-[#2b2b2b] rounded'>
        <div className='py-2'>
          <h2 className='text-2xl font-bold'>Accessibility Testing</h2>
          <p className='text-base text-gray-800'>
            Pages per minute (Linux ARM64)
          </p>
        </div>
        <ul className='grid grid-cols-3 place-items-start pt-1 h-40 place-items-center bg-gray-50'>
          <li className='flex flex-1 px-2 h-full'>
            <div className='flex flex-col h-full place-content-end'>
              <div className='py-1' aria-hidden='true'>
                <div className='text-base font-semibold'>4,020</div>
              </div>
              <div className='px-2 bg-orange-600 h-full w-20 rounded-t border-4 border-b-0 border-orange-700'>
                <div className='sr-only'>A11yWatch: 4,020 scans per minute</div>
              </div>
            </div>
          </li>
          <li className='flex flex-1 px-2 h-full'>
            <div className='flex flex-col h-full place-content-end'>
              <div className='py-1' aria-hidden='true'>
                <div className='text-base font-semibold'>55</div>
              </div>
              <div className='px-2 bg-gray-700 h-[6px] w-20 rounded-t'>
                <div className='sr-only'>Pa11y: 50 scans per minute</div>
              </div>
            </div>
          </li>
          <li className='flex flex-1 px-2 h-full'>
            <div className='flex flex-col h-full place-content-end'>
              <div className='py-1' aria-hidden='true'>
                <div className='text-base font-semibold'>33</div>
              </div>
              <div className='px-2 bg-gray-700 h-[5px] w-20 rounded-t'>
                <div className='sr-only'>Axe: 33 scans per minute</div>
              </div>
            </div>
          </li>
        </ul>
        <div className='grid grid-cols-3 py-2 text-center'>
          <a
            href='https://github.com/a11ywatch/github-actions/blob/main/.github/workflows/bench-action.yml'
            target='_blank'
            rel='noreferrer'
            className='hover:ring'
            aria-label='a11ywatch benchmark source'
          >
            <div className='font-bold'>a11ywatch</div>
            <div className='text-base text-gray-600'>v0.2.20</div>
            <div className='text-sm'>View source</div>
          </a>
          <a
            href='https://github.com/a11ywatch/github-actions/blob/main/.github/workflows/bench-pa11y.yml'
            target='_blank'
            className='hover:ring'
            aria-label='pa11y benchmark source'
            rel='noreferrer'
          >
            <div className='font-bold'>pa11y</div>
            <div className='text-base text-gray-600'>v6.2.3</div>
            <div className='text-sm'>View source</div>
          </a>
          <a
            href='https://github.com/a11ywatch/github-actions/blob/main/.github/workflows/bench-axe.yml'
            target='_blank'
            className='hover:ring'
            aria-label='axe benchmark source'
            rel='noreferrer'
          >
            <div className='font-bold'>axe</div>
            <div className='text-base text-gray-600'>v4.4.3</div>
            <div className='text-sm'>View source</div>
          </a>
        </div>
      </div>
    </div>
  )
}

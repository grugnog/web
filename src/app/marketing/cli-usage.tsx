import React from 'react'
import { SectionContainer } from '../containers/section-container'
import { SectionHeading } from '../typo/section-heading'
import { Link } from '../typo/link'

const infoDetails = [
  {
    title: 'Local, CI, or Remote',
    subTitle:
      'Want to host A11yWatch on your own? In one command start the project with docker or directly on the machine. Tear up or down the project in seconds with our slim binary builds or via Terraform.',
  },
  {
    title: 'Concurrent Website Testing',
    subTitle: `Get reports for thousands of pages in seconds with real browsers. Get spot on results with up to 55% of all web accessibility issues handled with recommendations.`,
  },
  {
    title: 'Beyond Fast',
    subTitle:
      'Get results with practically no downtime for your web pages across every workflow. The suite is small and powerful running on linux, macOS, and windows using native features for the cutting edge performance.',
  },
]

const previewStyles = {
  width: '8px',
  display: 'inline-block',
  height: '1.25rem',
  marginLeft: '0.2rem',
  transform: 'translateY(0.2rem)',
  backgroundColor: 'rgb(160, 160, 160)',
}

export function MarketingCli() {
  return (
    <SectionContainer>
      <div className='ring-1 shadow-xl ring-[#0E1116] ring-offset-8 ring-offset-gray-600 py-4 px-4 rounded'>
        <SectionHeading>Command Line Interface</SectionHeading>
        <p className='text-lg pb-4 leading-10'>
          Run A11yWatch on any machine using the Rust Command Line Interface.
          Get the CLI simply in shell using{' '}
          <code className='text-gray-700 bg-gray-300 p-1'>
            npm i a11ywatch-cli -g
          </code>
          .
        </p>
        <div className='flex flex-wrap gap-x-5 space-y-4 place-items-center'>
          <div className='flex-1 sm:w-1/3 shadow-xl'>
            <div className='bg-[#0E1116] rounded'>
              <div className='py-3 px-3 text-base lg:text-xl md:text-lg'>
                <div className='text-gray-100'>
                  <span className='text-gray-300 select-none'>~ </span> npm i
                  a11ywatch-cli -g
                </div>
                <div className='text-gray-200'>
                  <span className='text-gray-300 select-none'>~ </span>{' '}
                  {`a11ywatch build && a11ywatch start`}
                </div>
                <div className='text-gray-300'>
                  <span className='text-gray-400 select-none'>~ </span>{' '}
                  a11ywatch crawl -u localhost:3000
                  <span style={previewStyles}></span>
                </div>
              </div>
            </div>
          </div>
          <div className='md:w-1/2 sm:w-1/3'>
            <ul className={'text-left space-y-3'}>
              {infoDetails.map(
                (detail: { title: string; subTitle: string }, i: number) => {
                  return (
                    <li key={i}>
                      <div className={'text-2xl font-semibold'}>
                        {detail.title}
                      </div>
                      <div className={'text-lg'}>{detail.subTitle}</div>
                    </li>
                  )
                }
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className='flex py-6 place-content-center text-center'>
        <Link
          href={'https://docs.a11ywatch.com/documentation/cli/'}
          target='_blank'
          rel='referrer'
        >
          <div className='border px-4 py-2 rounded bg-[#0E1116] text-white hover:bg-gray-800 underline-none text-lg'>
            View CLI Details
          </div>
        </Link>
      </div>
    </SectionContainer>
  )
}

import React from 'react'
import { SectionContainer } from '../containers/section-container'
import { Header3 } from '@app/components/general/header'
import { companyName } from '@app/configs'
import { Link } from '../typo/link'

export function MarketingAlternatives() {
  return (
    <SectionContainer className={'bg-blue-50 py-6'}>
      <div className='container mx-auto'>
        <div className='flex flex-1 flex-col md:flex-row space-between place-items-center gap-3'>
          <div className='flex-1 flex flex-col'>
            <Header3 className='max-w-none'>
              Pick the best Wave alternative
            </Header3>
            <p className='text-sm md:text-xl font-medium text-gray-800'>
              Start a free 7 day trial for {companyName} now
            </p>
          </div>
          <div className='flex flex-1 md:place-content-end md:pr-40'>
            <Link
              className={`px-6 py-2 rounded border bg-black text-white tracking-wider font-medium hover:bg-gray-100 hover:text-black hover:no-underline`}
              href={'/register'}
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

import React from 'react'
import { companyName, dev, DOMAIN_NAME } from '@app/configs'
import { GrMoney } from 'react-icons/gr'
import { Link } from './link'

export const PricingCalculator = () => {
  // TODO: replace with localhost domain name with port
  return (
    <Link
      href={dev ? '/create-calculator' : `${DOMAIN_NAME}/create-calculator`}
      className={'pointer hover:no-underline'}
    >
      <div className='flex place-items-center border p-4 py-5 rounded space-x-4 overflow-hidden'>
        <div className='px-4'>
          <GrMoney className='grIcon w-10 h-10 md:w-20 md:h-20 text-gray-400' />
        </div>
        <div className='space-y-6'>
          <div className='lb-none-pad lb-none-v-margin lb-box'>
            <h3 className='font-bold text-xl md:text-2xl'>
              {companyName} Pricing Calculator
            </h3>
            <div className='text-base md:text-lg truncate'>
              <p>
                Calculate your&nbsp;{companyName} plans in a single estimate.
              </p>
            </div>
            <div className='text-blue-600'>
              <p>
                <b>Create your custom estimate now&nbsp;»</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

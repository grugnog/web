import { FC } from 'react'
import { companyName, dev, DOMAIN_NAME } from '@app/configs'
import { GrMoney } from 'react-icons/gr'
import { Link } from './link'

export const PricingCalculator: FC = () => {
  return (
    <Link
      href={dev ? '/create-calculator' : `${DOMAIN_NAME}/create-calculator`}
      className={'pointer hover:no-underline'}
    >
      <div className='flex flex-col sm:flex-row place-items-center border px-2 py-5 rounded gap-x-4 overflow-hidden gap-y-1'>
        <div className='px-4'>
          <GrMoney className='grIcon w-6 h-6 md:w-20 md:h-20 text-gray-400' />
        </div>
        <div className='gap-y-6'>
          <div className='lb-none-pad lb-none-v-margin lb-box'>
            <h3 className='font-bold text-xl md:text-2xl'>
              {companyName} Pricing Calculator
            </h3>
            <div className='text-sm md:text-base md:text-lg line-clamp-2 py-1'>
              <p>Calculate your plans in a single estimate.</p>
            </div>
            <p className='text-blue-600 font-semibold'>
              Create your custom estimate now&nbsp;»
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

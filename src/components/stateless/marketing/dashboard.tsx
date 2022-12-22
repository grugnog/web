import { ReactElement } from 'react'
import { SectionContainer } from '../containers/section-container'
import { Header3 } from '@app/components/general/header'
import Image from 'next/image'

export function MarketingDashboard(): ReactElement<any, any> | null {
  return (
    <SectionContainer>
      <div className='place-content-center place-items-center flex flex-col'>
        <Header3>All the details you need in one location</Header3>
        <p className='text-gray-700'>
          Get inclusive reports across all your websites with real time updates.
        </p>
        <div className='py-4'>
          <Image
            width={1512}
            className={'shadow border rounded'}
            height={814}
            quality={100}
            src={'/img/dashboard-example.png'}
            alt={
              'A11yWatch dashboard example for monitoring, remediating, and learning web accessibility'
            }
          />
        </div>
      </div>
    </SectionContainer>
  )
}

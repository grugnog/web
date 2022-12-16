import { ReactElement } from 'react'
import { SectionContainer } from '../containers/section-container'
import { Header3 } from '@app/components/general/header'
import Image from 'next/image'

export function MarketingDashboard(): ReactElement<any, any> | null {
  return (
    <SectionContainer>
      <div className='place-content-center place-items-center flex flex-col'>
        <Header3>All the details you need in one location</Header3>
        <p>Get insight on all of your domains live.</p>
        <div className='py-4'>
          <Image
            width={1400}
            className={'shadow-xl border rounded'}
            height={819}
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

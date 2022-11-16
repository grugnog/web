import React from 'react'
import { MarketingDrawer, PageTitle, Spacer } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { SectionContainer } from '@app/app/containers/section-container'
import { Header2 } from '@app/components/general/header'

function Privacy({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <SectionContainer container block>
        <PageTitle>Privacy Policy</PageTitle>
        <p className='text-base'>
          The data that is collected is used within our service to improve your
          experience and only that. All data is secure and safe coming from our
          service. None of the data collected from A11yWatch is being shared
          with any 3rd party service.
        </p>
        <Spacer height={'20px'} />
        <Header2>Privacy Respected Analytics</Header2>
        <p className='text-base'>
          We care about your privacy and value every aspect of it. We do not
          perform any type of tracking across our services. Learn more about our{' '}
          <a
            href={'https://usefathom.com/ref/ISNKKY'}
            target='_blank'
            rel='noreferrer'
          >
            privacy focused analytics service
          </a>{' '}
          and try it out for yourself.
        </p>
      </SectionContainer>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Privacy },
  {
    description:
      'This Privacy Policy applies to personal information processed by us in our business, including (e.g., a11ywatch.com.',
  }
)

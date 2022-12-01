import { MarketingDrawer, PriceMemo } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { Partners } from '@app/app/marketing/partners'
import { SectionContainer } from '@app/app/containers/section-container'
import { Header, Header3 } from '@app/components/general/header'

function Pricing({ name }: PageProps) {
  return (
    <MarketingDrawer title={name}>
      <SectionContainer container block>
        <Header>Maintainable and easy pricing</Header>
        <h2 className={'text-base pb-2 font-medium'}>
          Plans are usage based that can be adjusted at anytime.
        </h2>

        <p className='w-1/2'>
          Get detailed accessibility reports that go beyond the basics with ease
          across all your websites.
        </p>
        <PriceMemo navigate pricingPage />

        <div className='py-4 text-center'>
          <p>
            The accessibility scan duration is measured strictly based on the
            time it takes for the DOM to load.
          </p>
          <p>
            Scans run concurrently, so 30 seconds may be equal to 1 second in
            real time.
          </p>
        </div>
        
        <div className='py-4'>
          <Header3>
            Prices made for everyone
          </Header3>
          <p>Depending on the amount of usage you need determines the plan for you. The plans fit even if you are a indie dev, small business, or large company with thousands of websites that need to stay accessible 24/7.</p>
        </div>

        <Partners />
      </SectionContainer>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Pricing },
  {
    description:
      'Look at pricing plans to help improve accessibility for your project. Suited for small to large companies that need web accessibility assurance.',
  }
)

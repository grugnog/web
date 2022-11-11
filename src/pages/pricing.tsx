import { MarketingDrawer, PriceMemo } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { Partners } from '@app/app/marketing/partners'
import { SectionContainer } from '@app/app/containers/section-container'
import { Header } from '@app/components/general/header'
import { PricingCalculator } from '@app/components/general/pricing-calculator'

function Pricing({ name }: PageProps) {
  return (
    <MarketingDrawer title={name}>
      <SectionContainer container block>
        <Header>Maintainable and easy pricing</Header>
        <h2 className={'text-base pb-2'}>
          Plans are usage based that can be adjusted at anytime
        </h2>

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

        <Partners />
        <PricingCalculator />
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

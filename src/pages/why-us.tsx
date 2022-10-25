import { PageTitle, MarketingDrawer } from '@app/components/general'

import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { companyName } from '@app/configs'
import { MarketingFeatureCompareList } from '@app/app/marketing/features-compare'

function WhyUs({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <PageTitle>Why {companyName} vs X</PageTitle>
      <div className='py-2'>
        <h2 className='text-xl font-bold'>Web accessibility tool comparison</h2>
        <p className='text-base'>
          A detailed list of comparing tools and services for web accessibility.
        </p>
      </div>
      <MarketingFeatureCompareList />
    </MarketingDrawer>
  )
}

export default metaSetter(
  { WhyUs },
  {
    title: 'Why Us?',
    description:
      'The benefits of A11yWatch compared amongst other web accessibility tools and services. See the facts on why you should pick us.',
  }
)

import { MarketingDrawer } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { companyName } from '@app/configs'
import { MarketingFeatureCompareList } from '@app/app/marketing/features-compare'
import { SectionContainer } from '@app/app/containers/section-container'
import { Header } from '@app/components/general/header'

function WhyUs({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <SectionContainer block container>
        <Header>Why {companyName} VS X</Header>
        <div className='py-2'>
          <h2 className='text-xl font-bold'>
            Web accessibility tool comparison
          </h2>
          <p className='text-base'>
            A detailed list of comparing tools and services for web
            accessibility.
          </p>
        </div>
        <MarketingFeatureCompareList />
      </SectionContainer>
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

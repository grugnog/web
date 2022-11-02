import { Fragment } from 'react'
import { metaSetter } from '@app/utils'
import { strings } from '@app-strings'

import { MarketingIntro } from '@app/app/marketing/intro-rest'
import { FeaturesList } from '@app/app/marketing/features'
import { JavascriptUsage } from '@app/app/marketing/js-usage'
import { MarketingCli } from '@app/app/marketing/cli-usage'
import { MarketingTrustBy } from '@app/app/marketing/trusted'
import { CtaInputRest } from '@app/components/cta/searchbar/cta-input-rest'

import { MarketingDrawer } from '@app/components/general'
import { MarketingBottomTemporaryDrawer } from '@app/components/modal'

function Index() {
  return (
    <Fragment>
      <MarketingDrawer navPosition={'relative'} index>
        <MarketingIntro>
          <CtaInputRest />
        </MarketingIntro>
        <FeaturesList />
        <JavascriptUsage />
        <MarketingCli />
        <MarketingTrustBy />
      </MarketingDrawer>
      <MarketingBottomTemporaryDrawer />
    </Fragment>
  )
}

export default metaSetter(
  { Index },
  {
    rest: true,
    title: `The all around web accessibility tool.`,
    description: `Build accessible websites with tools that monitor, fix, and guide web accessibility efficiency with ${strings.appName}`,
  }
)

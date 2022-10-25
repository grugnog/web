import { Fragment } from 'react'
import { MarketingDrawer } from '@app/components/general'
import { CtaIntroRest } from '@app/components/cta'
import { metaSetter } from '@app/utils'
import { strings } from '@app-strings'
import { MarketingBottomTemporaryDrawer } from '@app/components/modal'
import { FeaturesList } from '@app/app/marketing/features'
import { JavascriptUsage } from '@app/app/marketing/js-usage'
import { MarketingCli } from '@app/app/marketing/cli-usage'
import { MarketingTrustBy } from '@app/app/marketing/trusted'

function Index() {
  return (
    <Fragment>
      <MarketingDrawer navPosition={'relative'} maxWidth={'xl'} index>
        <CtaIntroRest />
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
    intercom: true,
    title: `The all around web accessibility tool.`,
    description: `Build accessible websites with tools that monitor, fix, and guide web accessibility efficiency with ${strings.appName}`,
  }
)

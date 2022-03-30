import React, { Fragment } from 'react'
import { MarketingDrawer, SignOnForm } from '@app/components/general'
import { CtaIntro } from '@app/components/cta'
import { WithSwipeModal as SwipeableTemporaryDrawer } from '@app/components/adhoc'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

function WebsiteAccessibilityChecker({ name }: PageProps) {
  return (
    <Fragment>
      <MarketingDrawer title={name} navPosition={'relative'}>
        <CtaIntro checker />
        <SignOnForm home />
      </MarketingDrawer>
      <SwipeableTemporaryDrawer />
    </Fragment>
  )
}

export default metaSetter(
  { WebsiteAccessibilityChecker },
  {
    description: `Check the accessibility of your webpage today. Improve your web inclusion with accessibility testing, reports, recommendations, monitoring, and instant accessibility fixes.`,
    gql: true,
    intercom: true,
  }
)

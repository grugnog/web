import React, { Fragment } from 'react'
import { MarketingDrawer, SignOnForm } from '@app/components/general'
import { CtaIntro } from '@app/components/cta'
import { WithSwipeModal as SwipeableTemporaryDrawer } from '@app/components/adhoc'
import { strings } from '@app-strings'
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
    description: `Improve your web inclusion and brand reputation with ${strings.appName}. Accessibility testing, reports, recommendations, monitoring, and code fixes for your websites.`,
    gql: true,
    intercom: true,
  }
)

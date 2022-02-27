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
      <MarketingDrawer title={name}>
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
    description: `Increase user experience and brand reputation with ${strings.appName}. Features provided include Automated Testing, Web Accessibility Tools, Monitoring, and Instant Accessibility Fixes.`,
    gql: true,
  }
)

import React, { Fragment } from 'react'
import { MarketingDrawer, Price } from '@app/components/general'
import {
  CtaFeatures,
  CtaIntro,
  CtaVideo,
  CtaCustomers,
  CtaSignonForm,
  CtaProfessionalSupportButton,
} from '@app/components/cta'
import { WithSwipeModal as SwipeableTemporaryDrawer } from '@app/components/adhoc'
import {
  MarketingTestimonial,
  MarketingTrustBy,
  MarketingCli,
} from '@app/components/marketing'
import { metaSetter } from '@app/utils'
import { strings } from '@app-strings'

function Index() {
  return (
    <Fragment>
      <MarketingDrawer navPosition={'relative'} maxWidth={'xl'} index>
        <CtaProfessionalSupportButton />
        <CtaIntro />
        <CtaVideo />
        <CtaFeatures />
        <CtaCustomers />
        <MarketingCli />
        <MarketingTestimonial />
        <MarketingTrustBy />
        <Price blockFree navigate />
        <CtaSignonForm />
      </MarketingDrawer>
      <SwipeableTemporaryDrawer />
    </Fragment>
  )
}

export default metaSetter(
  { Index },
  {
    intercom: true,
    gql: true,
    title: `${strings.appName}: the all around web accessibility tool.`,
    description: `Build accessible websites with tools that monitor, fix, and guide web accessibility efficiency with ${strings.appName}`,
  }
)

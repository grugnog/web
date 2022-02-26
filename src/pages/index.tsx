/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
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

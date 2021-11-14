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
  CtaSearch,
  CtaSignonForm,
} from '@app/components/cta'
import { WithSwipeModal as SwipeableTemporaryDrawer } from '@app/components/adhoc'
import {
  MarketingShapesTop,
  MarketingTestimonial,
  MarketingTrustBy,
} from '@app/components/marketing'

function Index() {
  return (
    <Fragment>
      <MarketingDrawer navPosition={'relative'} maxWidth={'xl'}>
        <MarketingShapesTop />
        <CtaIntro />
        <CtaVideo />
        <CtaFeatures />
        <CtaCustomers />
        <CtaSearch />
        <MarketingTestimonial />
        <MarketingTrustBy />
        <Price blockFree navigate />
        <CtaSignonForm />
      </MarketingDrawer>
      <SwipeableTemporaryDrawer />
    </Fragment>
  )
}

export default Index

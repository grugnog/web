/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { Fragment, useState } from 'react'
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
import { withApollo } from '@app/apollo'
import {
  MarketingShapesTop,
  MarketingTestimonial,
  MarketingTrustBy,
} from '@app/components/marketing'

function Index() {
  // TODO: MOVE TO PRICE COMPONENT
  const [yearly, setYearly] = useState<boolean>(false)

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
        <Price blockFree navigate setYearly={setYearly} yearly={yearly} />
        <CtaSignonForm />
      </MarketingDrawer>
      <SwipeableTemporaryDrawer />
    </Fragment>
  )
}

export default withApollo(Index)

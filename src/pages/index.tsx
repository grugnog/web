/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { Fragment } from 'react'
import { InferGetStaticPropsType } from 'next'
import { MarketingDrawer, Price, Spacer } from '@app/components/general'
import { WhatsNew } from '@app/components/alerts'
import type { WhatsNewProps } from '@app/components/alerts'
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
} from '@app/components/marketing'
import { getAPIRoute } from '@app/configs'

function Index({ whatsNew }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Fragment>
      <MarketingDrawer navPosition={'relative'}>
        <MarketingShapesTop />
        <CtaIntro />
        <CtaVideo />
        <CtaFeatures />
        <CtaCustomers />
        <CtaSearch />
        <MarketingTestimonial />
        <Price blockFree navigate />
        <CtaSignonForm />
      </MarketingDrawer>
      {whatsNew ? <Spacer height={73} /> : null}
      <SwipeableTemporaryDrawer />
      {whatsNew ? <WhatsNew {...whatsNew} /> : null}
    </Fragment>
  )
}

type IndexResponse = {
  data: WhatsNewProps
  message: string
}

export async function getStaticProps() {
  let whatsNew: IndexResponse | null = null
  try {
    const res = await fetch(`${getAPIRoute()}/whats-new`)
    const resJson = await res.json()

    if (resJson?.data) {
      whatsNew = resJson.data
    }
  } catch (e) {
    console.error(e)
  }
  return {
    props: {
      whatsNew,
      // websites,
    },
    revalidate: 6 * 60 * 1000,
  }
}

export default withApollo(Index)

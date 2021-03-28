/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { Fragment } from 'react'
import { MarketingDrawer } from '@app/components/general'
import { TestView } from '@app/components/general/test-view'
import { WithSwipeModal as SwipeableTemporaryDrawer } from '@app/components/adhoc'
import { withApollo } from '@app/apollo'
import type { PageProps } from '@app/types'
import { metaSetter } from '@app/utils'

function Test({ name }: PageProps) {
  return (
    <Fragment>
      <MarketingDrawer initClosed={true} renderCtaSearch title={name}>
        <TestView marketing />
      </MarketingDrawer>
      <SwipeableTemporaryDrawer />
    </Fragment>
  )
}

export default withApollo(metaSetter({ Test }))

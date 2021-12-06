/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { Typography } from '@material-ui/core'
import {
  MarketingDrawer,
  PriceMemo,
  SignOnForm,
  PageTitle,
} from '@app/components/general'
import { Box } from '@a11ywatch/ui'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

function Pricing({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} maxWidth={'xl'}>
      <Box>
        <PageTitle>
          The simplest accessibility solution, for the simplest price.
        </PageTitle>
        <Typography component='h2' gutterBottom className={'sr-only'}>
          Choose a plan that best fits your needs
        </Typography>
        <PriceMemo navigate blockFree pricingPage />
        <SignOnForm home />
      </Box>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Pricing },
  {
    description:
      'Look at pricing plans to help improve accessibility for your project. Suited for small to large companies that need web accessibility assurance.',
  }
)

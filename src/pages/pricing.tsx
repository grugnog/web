/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { Typography } from '@material-ui/core'
import {
  MarketingDrawer,
  Price,
  SignOnForm,
  PageTitle,
} from '@app/components/general'
import { Box } from '@a11ywatch/ui'
import { withApollo } from '@app/apollo'
import { metaSetter } from '@app/utils'

function Pricing({ name }: any) {
  return (
    <MarketingDrawer title={name}>
      <Box>
        <PageTitle>Plans</PageTitle>
        <Typography variant='body1' component='h2'>
          Choose a plan that best fits your needs
        </Typography>
        <Price navigate blockFree />
        <SignOnForm home />
      </Box>
    </MarketingDrawer>
  )
}

export default withApollo(metaSetter({ Pricing }))

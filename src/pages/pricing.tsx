/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import {
  MarketingDrawer,
  Price,
  SignOnForm,
  PageTitle,
} from '@app/components/general'
import { Box } from '@a11ywatch/ui'
import { metaSetter } from '@app/utils'

function Pricing({ name }: { name: string }) {
  const [yearly, setYearly] = useState<boolean>(false)

  return (
    <MarketingDrawer title={name} maxWidth={'xl'}>
      <Box>
        <PageTitle>Pricing</PageTitle>
        <Typography component='h2' gutterBottom>
          Choose a plan that best fits your needs
        </Typography>
        <Price navigate blockFree yearly={yearly} setYearly={setYearly} />
        <SignOnForm home />
      </Box>
    </MarketingDrawer>
  )
}

export default metaSetter({ Pricing })

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { Typography } from '@material-ui/core'
import { MarketingDrawer, PageTitle, Spacer } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

function Privacy({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <PageTitle>Privacy Policy</PageTitle>
      <Typography variant='body1' component='p' gutterBottom>
        The data that is collected is used within our service to improve your
        experience. All data is secure and safe coming from our service. None of
        the data collected from A11yWatch is being shared with any 3rd party
        service.
      </Typography>
      <Spacer height={'20px'} />
      <Typography variant='h4' component='h2' gutterBottom>
        Analytics
      </Typography>
      <Typography variant='body1' component='p' gutterBottom>
        We care about your privacy and value every aspect of it. Tracking is
        respected through the request header DNT that your browser adds to your
        out going network calls.
      </Typography>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Privacy },
  {
    description:
      'This Privacy Policy applies to personal information processed by us in our business, including (e.g., a11ywatch.com and any other website part of the A11yWatch group.',
  }
)

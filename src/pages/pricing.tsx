/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { MarketingDrawer, PriceMemo, PageTitle } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

function Pricing({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} maxWidth={'xl'}>
      <PageTitle className={'w-3/4'}>
        The simplest accessibility solution, for the simplest price.
      </PageTitle>
      <Typography component='h2' gutterBottom className={'text-lg'}>
        Choose a plan that best fits your needs
      </Typography>
      <PriceMemo navigate blockFree pricingPage />
      <div className='p-5 bg-gray-200 my-5 space-y-3 rounded'>
        <h5 className='text-xl'>For Partners</h5>
        <div className='text-lg'>
          Apply to become partners as an approved agency, technology, or
          professional services.
        </div>
        <Button
          variant='outlined'
          component={'a'}
          href={
            'mailto:support@a11ywatch.com' +
            '?subject=' +
            encodeURIComponent('Partner') +
            '&body=' +
            'I would like to find out more about your partnership.'
          }
        >
          Contact Us
        </Button>
      </div>
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

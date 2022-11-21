import React from 'react'
import { Logo, MarketingDrawer, PageTitle } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

const PageNotFound = ({ name }: PageProps) => {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <PageTitle>404</PageTitle>
      <Logo />
      <p className='text-lg'>Page not found.</p>
      <p>If the issue continues please try again later or contact support.</p>
    </MarketingDrawer>
  )
}

export default metaSetter({ PageNotFound })

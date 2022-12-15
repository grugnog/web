import React from 'react'
import { Logo, MarketingDrawer, PageTitle } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

const PageNotFound = ({ name }: PageProps) => {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <PageTitle>500</PageTitle>
      <Logo />
      <p className='text-lg'>Server Error.</p>
      <p>If the issue continues please try again later or contact support.</p>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { PageNotFound },
  {
    description:
      'A server error occurred, please contact support if issues persist.',
  }
)

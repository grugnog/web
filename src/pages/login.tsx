import React from 'react'
import { MarketingDrawer, SignOnForm } from '@app/components/general'
import { MarketingShortTitle } from '@app/components/marketing'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

function Login({ name }: PageProps) {
  return (
    <MarketingDrawer
      title={name}
      maxWidth='sm'
      footerSpacing
      emptyFooter
      emptyNav
    >
      <MarketingShortTitle />
      <SignOnForm loginView />
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Login },
  {
    gql: true,
    description: 'Login in to get all your accessibility insight and more.',
  }
)

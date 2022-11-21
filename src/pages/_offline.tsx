import React from 'react'
import { Logo, MarketingDrawer } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { Header } from '@app/components/general/header'

const Offline = ({ name }: PageProps) => {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <Header>Offline</Header>
      <Logo />
      <p>
        It looks like your offline. Try to refresh the page to re-establish your
        connection.
      </p>
      <p>If the issue continues please try again later or contact support.</p>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Offline },
  {
    description:
      'Offline content without network connection. Please check your wifi connection to use the application.',
  }
)

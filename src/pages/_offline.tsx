import React from 'react'
import { MarketingDrawer } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { Header } from '@app/components/general/header'
import { GrOfflineStorage } from 'react-icons/gr'

const Offline = ({ name }: PageProps) => {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <Header>Offline</Header>
      <GrOfflineStorage className='text-xl md:text-2xl' />
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

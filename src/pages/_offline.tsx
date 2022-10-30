import React from 'react'
import { Typography } from '@material-ui/core'
import { MarketingDrawer } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { Header } from '@app/components/general/header'

const Offline = ({ name }: PageProps) => {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <Header>Offline</Header>
      <Typography variant='body1' component='p' gutterBottom>
        It looks like your offline. Try to refresh the page to re-establish your
        connection.
      </Typography>
      <Typography variant='subtitle1' component='p' gutterBottom>
        If the issue continues please try again later or contact support.
      </Typography>
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

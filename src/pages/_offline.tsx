import React from 'react'
import { Typography } from '@material-ui/core'
import { MarketingDrawer } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { PageTitle } from '@app/app/typo/page-title'

const Offline = ({ name }: PageProps) => {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <PageTitle>Offline</PageTitle>
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

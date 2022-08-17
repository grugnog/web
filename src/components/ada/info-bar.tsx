import React, { memo } from 'react'
import { Button } from '@material-ui/core'
import { printElement } from '@app/utils'
import { getAPIRoute } from '@app/configs'
import type { Website } from '@app/types'
import { feedListID } from '../feed/list'

interface InfoBarComponent {
  printable?: boolean
  website: Website
  download?: boolean // display the download button
  onToggleViewModeEvent?: (a?: any) => void
}

export function InfoBarComponent({
  printable,
  website,
  download = false,
  onToggleViewModeEvent,
}: InfoBarComponent) {
  if (!printable) {
    return null
  }

  if (!website?.domain) {
    return <div className='flex py-2 space-x-2'></div>
  }

  const onPrint = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    printElement(feedListID, website)
  }

  return (
    <div className='flex py-2 space-x-2 border border-l-0 border-r-0'>
      <Button onClick={onPrint}>Print</Button>
      {download ? (
        <Button
          component={'a'}
          href={`${getAPIRoute()}/get-website?q=${website?.url}&download=true`}
        >
          Download
        </Button>
      ) : null}
      {onToggleViewModeEvent ? (
        <Button className={'border'} onClick={onToggleViewModeEvent}>
          Change Primary View
        </Button>
      ) : null}
    </div>
  )
}

export const InfoBar = memo(InfoBarComponent)

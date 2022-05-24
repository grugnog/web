import React, { memo } from 'react'
import { Button } from '@material-ui/core'
import { printElement } from '@app/utils'
import { getAPIRoute } from '@app/configs'
import type { Website } from '@app/types'

const CTA_LIST_ID = 'cta-issue-list'

interface InfoBarComponent {
  printable?: boolean
  website: Website
  download?: boolean // display the download button
}

export function InfoBarComponent({
  printable,
  website,
  download = true,
}: InfoBarComponent) {
  if (!printable) {
    return null
  }

  if (!website?.domain) {
    return <div className='flex py-2 space-x-2'></div>
  }

  const onPrint = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    printElement(CTA_LIST_ID, website)
  }

  return (
    <div className='flex py-2 space-x-2 border border-l-0 border-r-0'>
      <Button className={'border'} onClick={onPrint}>
        Print
      </Button>
      {download ? (
        <Button
          className={'border'}
          component={'a'}
          href={`${getAPIRoute()}/get-website?q=${website?.url}&download=true`}
        >
          Download
        </Button>
      ) : null}
    </div>
  )
}

export const InfoBar = memo(InfoBarComponent)

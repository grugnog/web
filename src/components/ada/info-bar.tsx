import React, { memo } from 'react'
import { Button } from '@material-ui/core'
import { printElement } from '@app/utils'
// import { getAPIRoute } from '@app/configs'
import type { Website } from '@app/types'

const CTA_LIST_ID = 'cta-issue-list'

interface InfoBarComponent {
  printable?: boolean
  website: Website
}

export function InfoBarComponent({ printable, website }: InfoBarComponent) {
  if (!printable) {
    return null
  }

  if (!website?.domain) {
    return <div className='flex py-2 space-x-2'></div>
  }

  return (
    <div className='flex py-2 space-x-2 border border-l-0 border-r-0'>
      <Button
        className={'border'}
        onClick={() => printElement(CTA_LIST_ID, website)}
      >
        Print
      </Button>
      {/* <Button
        className={'border'}
        component={'a'}
        href={`${getAPIRoute()}/get-website?q=${website?.url}&download=true`}
      >
        Download
      </Button> */}
      {website?.screenshot ? (
        <Button
          className={'border'}
          onClick={() => window.open(website.screenshot + '')}
        >
          View Screenshot
        </Button>
      ) : null}
    </div>
  )
}

export const InfoBar = memo(InfoBarComponent)

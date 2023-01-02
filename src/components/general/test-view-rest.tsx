'use client'

import React from 'react'
import { observer } from 'mobx-react-lite'
import { HomeManager } from '@app/managers'
import { TestOutIframe } from '../ada/testout-iframe'
import { Website } from '@app/types'

const TestViewRestContainer = observer(
  ({ url: currentUrl, store, posRelative, website }: any) => {
    return (
      <div className='w-full h-full relative'>
        <TestOutIframe
          url={currentUrl ?? store?.getTestFrameUrl}
          website={website}
          posRelative={posRelative}
        />
      </div>
    )
  }
)

interface TestViewRestProps {
  marketing?: boolean
  url?: string
  posRelative?: boolean // iframe relative
  website?: Website
}

export function TestViewRest({
  marketing,
  url,
  posRelative,
  website,
}: TestViewRestProps) {
  return (
    <TestViewRestContainer
      store={HomeManager}
      marketing={marketing}
      url={url}
      posRelative={posRelative}
      website={website}
    />
  )
}

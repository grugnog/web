import React from 'react'
import { observer } from 'mobx-react-lite'
import { HomeManager } from '@app/managers'
import { TestOutIframe } from '../ada/testout-iframe'
import { OverlayPortalContainer } from './overlay'
import { Issue } from '@app/types'

const TestViewRestContainer = observer(
  ({ url: currentUrl, store, posRelative, issues }: any) => {
    const url = encodeURIComponent(currentUrl ?? store?.getTestFrameUrl)

    return (
      <>
        <TestOutIframe url={url} issue={issues} posRelative={posRelative} />
        <OverlayPortalContainer />
      </>
    )
  }
)

interface TestViewRestProps {
  marketing?: boolean
  url?: string
  posRelative?: boolean // iframe relative
  issues?: { issues: Issue[]; pageUrl?: string }
}

export function TestViewRest({
  marketing,
  url,
  posRelative,
  issues,
}: TestViewRestProps) {
  return (
    <TestViewRestContainer
      store={HomeManager}
      marketing={marketing}
      url={url}
      posRelative={posRelative}
      issues={{ issues: issues, pageUrl: url }}
    />
  )
}

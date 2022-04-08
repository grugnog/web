import React, { Fragment } from 'react'
import { observer } from 'mobx-react'
import { issueData, scriptData } from '@app/data'
import { HomeManager } from '@app/managers'
import { TestOutIframe } from '../ada/testout-iframe'
import { Fab } from './fab'
import { IssueModal } from './issue-modal'
import { OverlayPortalContainer } from './overlay'

const TestViewContainer = observer(
  ({ url: currentUrl, store, marketing }: any) => {
    const url = encodeURIComponent(currentUrl ?? store?.getTestFrameUrl)
    const { issue } = issueData(url, !url)
    const { script } = scriptData(url, marketing)

    return (
      <Fragment>
        <TestOutIframe url={url} issue={issue} />
        <Fab
          direction='left'
          autoFix
          issue={issue}
          script={script}
          marketing={marketing}
        />
        <OverlayPortalContainer />
        <IssueModal issue={issue} />
      </Fragment>
    )
  }
)

interface TestViewProps {
  marketing?: boolean
  url?: string
}

export function TestView({ marketing, url }: TestViewProps) {
  return (
    <TestViewContainer store={HomeManager} marketing={marketing} url={url} />
  )
}

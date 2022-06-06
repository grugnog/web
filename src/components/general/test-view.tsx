import React, { Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { issueData } from '@app/data'
import { HomeManager } from '@app/managers'
import { TestOutIframe } from '../ada/testout-iframe'
import { Fab } from './fab'
import { IssueModal } from './issue-modal'
import { OverlayPortalContainer } from './overlay'

const TestViewContainer = observer(
  ({ url: currentUrl, store, marketing, posRelative }: any) => {
    const url = encodeURIComponent(currentUrl ?? store?.getTestFrameUrl)
    const { issue } = issueData(url, !url)

    return (
      <Fragment>
        <TestOutIframe url={url} issue={issue} posRelative={posRelative} />
        <Fab direction='left' issue={issue} marketing={marketing} />
        <OverlayPortalContainer />
        <IssueModal issue={issue} />
      </Fragment>
    )
  }
)

interface TestViewProps {
  marketing?: boolean
  url?: string
  posRelative?: boolean // iframe relative
}

export function TestView({ marketing, url, posRelative }: TestViewProps) {
  return (
    <TestViewContainer
      store={HomeManager}
      marketing={marketing}
      url={url}
      posRelative={posRelative}
    />
  )
}

'use client'

import { Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { useIssue } from '@app/data'
import { HomeManager } from '@app/managers'
import { TestOutIframe } from '../ada/testout-iframe'
import { Fab } from './fab'
import { IssueModal } from './issue-modal'
import { Website } from '@app/types'

// test view playground
interface TestViewProps {
  marketing?: boolean
  url?: string
  posRelative?: boolean // iframe relative
  website?: Website
  store?: typeof HomeManager
}

// dynamic test container with active issues
const TestViewContainer = observer(
  ({
    url: currentUrl,
    store,
    marketing,
    posRelative,
    website,
  }: TestViewProps) => {
    const url = currentUrl || store?.getTestFrameUrl
    const { issue } = useIssue(url, !url)

    return (
      <Fragment>
        <TestOutIframe
          url={url}
          issue={issue}
          posRelative={posRelative}
          website={website}
        />
        <Fab direction='left' issue={issue} marketing={marketing} />
        <IssueModal issue={issue} />
      </Fragment>
    )
  }
)

// static container with issues for page
const TestViewContainerStatic = observer(
  ({
    url: currentUrl,
    store,
    marketing,
    posRelative,
    website,
  }: TestViewProps) => {
    const url = currentUrl || store?.getTestFrameUrl
    const issue = website?.issues

    return (
      <Fragment>
        <TestOutIframe
          url={url}
          issue={issue}
          posRelative={posRelative}
          website={website}
        />
        <Fab direction='left' issue={issue} marketing={marketing} />
        <IssueModal issue={issue} />
      </Fragment>
    )
  }
)

export function TestView({
  marketing,
  url,
  posRelative,
  website,
}: TestViewProps) {
  if (marketing) {
    return (
      <TestViewContainerStatic
        store={HomeManager}
        marketing={marketing}
        url={url}
        website={website}
        posRelative={posRelative}
      />
    )
  }
  return (
    <TestViewContainer
      store={HomeManager}
      marketing={marketing}
      url={url}
      website={website}
      posRelative={posRelative}
    />
  )
}

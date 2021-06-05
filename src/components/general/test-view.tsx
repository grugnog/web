/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { Fragment } from 'react'
import { observer } from 'mobx-react'
import { issueData, userModel, scriptData } from '@app/data'
import { HomeManager } from '@app/managers'
import { TestOutIframe } from '../ada/testout-iframe'
import { Fab } from './fab'
import { IssueModal } from './issue-modal'
import { OverlayPortalContainer } from './overlay'

const TestViewContainer = observer(
  ({ url: currentUrl, store, marketing }: any) => {
    const url = currentUrl ?? store?.getTestFrameUrl
    const { issue } = issueData(url)
    const { script } = userModel.loggedIn ? scriptData(url) : { script: null }

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

export function TestView({ marketing, url }: any) {
  return (
    <TestViewContainer store={HomeManager} marketing={marketing} url={url} />
  )
}

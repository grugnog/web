'use client'

import React from 'react'
import { observer } from 'mobx-react-lite'
import { frameDom, IframeManager } from '@app/managers'
import { useAutoFix, useMiniPlayer, useIframe } from '@app/data'
import { Box } from '@a11ywatch/ui'
import {
  GrList,
  GrMagic,
  GrMultimedia,
  GrStatusWarning,
  GrTestDesktop,
} from 'react-icons/gr'
import { issueExtractor } from '@app/utils'
import { Button } from './buttons'

const btnStyle =
  'w-full py-3 place-items-center bg-[rgba(20,20,20,0.3)] border-3'

const MFab = observer(({ iframeStore, issue, script, marketing }: any) => {
  const { setMiniPlayerContent, miniPlayer } = useMiniPlayer()
  const { highLight, toggleHighLight, setFrameContent } = useIframe()
  const { autoFixEnabled, setAutoFix } = useAutoFix(script)

  const pageIssues = issueExtractor(issue)

  return (
    <Box
      className={
        'absolute p-3 min-w-[100px] flex-col flex place-content-end bottom-0 left-0 space-y-2'
      }
    >
      {!marketing ? (
        <Button
          className={btnStyle}
          onClick={() => iframeStore.toggleView()}
          iconButton
          title='Issue with page, toggle to webview'
        >
          {iframeStore.viewMode ? (
            <GrTestDesktop className={'grIcon'} />
          ) : (
            <GrMultimedia className={'grIcon'} />
          )}
        </Button>
      ) : null}
      {highLight?.display ? (
        <Button
          className={btnStyle}
          onClick={toggleHighLight}
          iconButton
          title='Highlight elements fixed by CDN'
        >
          <GrList className={'grIcon'} />
        </Button>
      ) : null}
      {pageIssues?.length ? (
        <Button
          iconButton
          className={btnStyle}
          onClick={setMiniPlayerContent(!miniPlayer.open)}
          title='View page issues as list'
        >
          <GrStatusWarning className={'grIcon'} />
        </Button>
      ) : null}
      {script?.cdnUrlMinified && pageIssues?.length && !autoFixEnabled ? (
        <Button
          iconButton
          onClick={() =>
            frameDom.injectAutoFix({
              cdn: script?.cdnUrlMinified,
              autoFixEnabled,
              setAutoFix,
              callBack: setFrameContent,
            })
          }
          className={btnStyle}
        >
          <GrMagic className={'grIcon'} />
        </Button>
      ) : null}
    </Box>
  )
})

// <Button
//   onClick={adaStore.toggleScriptFix}
//   className={"w-full py-3 place-items-center bg-transparent border-3"}
//   variant='text'
// >
//   <CodeIcon color='secondary' />
// </Button>

export const Fab = ({ issue, script, marketing }: any) => (
  <MFab
    iframeStore={IframeManager}
    issue={issue}
    script={script}
    marketing={marketing}
  />
)

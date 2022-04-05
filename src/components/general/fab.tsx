import React from 'react'
import { observer } from 'mobx-react'
import { frameDom, IframeManager } from '@app/managers'
import { Button, Tooltip } from '@material-ui/core'
import { useAutoFix, useMiniPlayer, useIframe } from '@app/data'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@a11ywatch/ui'
import type { MergedTheme } from '@app/theme'
import {
  GrList,
  GrMagic,
  GrMultimedia,
  GrStatusWarning,
  GrTestDesktop,
} from 'react-icons/gr'

const useStyles = makeStyles((theme: MergedTheme) => ({
  bar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'flex-end',
    minWidth: '100px',
    padding: '12px',
  },
  button: {
    marginBottom: '10px',
    width: '100%',
    paddingTop: '14px',
    paddingBottom: '14px',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(20,20,20,0.3)',
    border: `4px solid ${theme.palette.secondary.main}`,
  },
  icon: {
    color: theme.palette.secondary.main,
  },
}))

const MFab = observer(({ iframeStore, issue, script, marketing }: any) => {
  const classes = useStyles()
  const { setMiniPlayerContent } = useMiniPlayer()
  const { highLight, toggleHighLight, setFrameContent } = useIframe()
  const { autoFixEnabled, setAutoFix } = useAutoFix(script)

  return (
    <Box className={classes.bar}>
      {!marketing ? (
        <Tooltip title='Issue with page, toggle to webview' placement='right'>
          <Button
            className={classes.button}
            onClick={() => iframeStore.toggleView()}
          >
            {iframeStore.viewMode ? (
              <GrTestDesktop className={classes.icon} />
            ) : (
              <GrMultimedia className={classes.icon} />
            )}
          </Button>
        </Tooltip>
      ) : null}
      {highLight?.display ? (
        <Tooltip title='Highlight elements fixed by CDN' placement='right'>
          <Button className={classes.button} onClick={toggleHighLight}>
            <GrList className={classes.icon} />
          </Button>
        </Tooltip>
      ) : null}
      {issue?.issues?.length ? (
        <Button className={classes.button} onClick={setMiniPlayerContent(true)}>
          <GrStatusWarning className={classes.icon} />
        </Button>
      ) : null}
      {script?.cdnUrlMinified && issue?.issues?.length && !autoFixEnabled ? (
        <Button
          onClick={() =>
            frameDom.injectAutoFix({
              cdn: script?.cdnUrlMinified,
              autoFixEnabled,
              setAutoFix,
              callBack: setFrameContent,
            })
          }
          className={classes.button}
        >
          <GrMagic className={classes.icon} />
        </Button>
      ) : null}
    </Box>
  )
})

// <Button
//   onClick={adaStore.toggleScriptFix}
//   className={classes.button}
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

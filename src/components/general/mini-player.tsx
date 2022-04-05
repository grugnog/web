import React, { useRef, FunctionComponent, useMemo } from 'react'
import {
  AppBar,
  Dialog,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { DragHandler } from '@app/lib'
import { useMiniPlayer } from '@app/data'
import { Fab } from './fab'
import { AdaIframe } from '../ada/ada-iframe'
import { Link } from './link'
import type { MergedTheme } from '@app/theme'
import { GrowTransition } from './grow'
// @ts-ignore
import ReportViewer from 'react-lighthouse-viewer'
import { GrClose } from 'react-icons/gr'

const useStyles = makeStyles((theme: MergedTheme) => ({
  root: {
    overflow: 'hidden',
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme?.spacing(2),
    flex: 1,
  },
  miniPlayer: {
    overflow: 'hidden',
    right: 'auto !important',
    left: 'auto',
    minWidth: '45vw',
    maxHeight: '65vh',
    margin: '0px !important',
  },
  transparent: {
    background: 'inherit',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    overflow: 'hidden',
  },
  subTitle: {
    maxWidth: '25vw',
    color: theme?.color?.indigo,
  },
}))

interface MiniPlayerProps {}

export const MiniPlayer: FunctionComponent<MiniPlayerProps> = (_) => {
  const { miniPlayer, setMiniPlayerContent } = useMiniPlayer()
  const classes = useStyles()
  const appBarRef = useRef(null)
  const handler = new DragHandler(appBarRef?.current)

  const { open, data, title } = useMemo(() => {
    if (miniPlayer?.title === 'Lighthouse') {
      return { ...miniPlayer, data: JSON.parse(miniPlayer?.data) }
    }
    return miniPlayer
  }, [miniPlayer])

  return (
    <Dialog
      fullScreen={false}
      onMouseDown={(e: any) => handler.dragMouseDown(e, appBarRef?.current)}
      ref={appBarRef}
      className={classes.miniPlayer}
      fullWidth
      open={open}
      onClose={setMiniPlayerContent(false)}
      TransitionComponent={GrowTransition as React.ComponentType}
      hideBackdrop
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      scroll={'paper'}
      BackdropProps={{
        classes: {
          root: classes.transparent,
        },
      }}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={setMiniPlayerContent(false)}
            aria-label='close'
          >
            <GrClose />
          </IconButton>
          <div className={classes.row}>
            <Typography variant='h6' className={classes.title}>
              {title}
            </Typography>
            {title !== 'Lighthouse' ? (
              <Typography
                variant='subtitle1'
                className={classes.subTitle}
                component={Link}
                color={'primary'}
                href={`/website-details?websiteUrl=${encodeURIComponent(data)}`}
              >
                {data}
              </Typography>
            ) : null}
          </div>
        </Toolbar>
      </AppBar>
      {title === 'Lighthouse' ? (
        <div>
          {/* @ts-ignore */}
          <style>
            {`
            .lh-topbar__url, .report-icon--download {
              display: none !important;
            }
            `}
          </style>
          <ReportViewer json={data} id='fullscreen-lighthouse-report' />
        </div>
      ) : (
        <div>
          <AdaIframe url={data} miniPlayer />
          <Fab autoFix />
        </div>
      )}
    </Dialog>
  )
}

import React, { useRef, FunctionComponent, useMemo } from 'react'
import {
  AppBar,
  Dialog,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useMiniPlayer } from '@app/data'
import { Fab } from './fab'
import { Link } from './link'
import { GrowTransition } from './grow'
import { GrClose } from 'react-icons/gr'
import dynamic from 'next/dynamic'
import Draggable from 'react-draggable'
import { Lighthouse } from './lighthouse'

const AdaIframe = dynamic(
  () => import('../ada/ada-iframe').then((mod) => mod.AdaIframe) as any
) as any

const useStyles = makeStyles(() => ({
  root: {
    overflow: 'hidden',
  },
  appBar: {
    position: 'relative',
    backgroundColor: '#0E1116',
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
  subTitle: {
    color: '#fff',
  },
}))

interface MiniPlayerProps {}

// a mini modal that appears that can be dragged across the screen.
export const MiniPlayer: FunctionComponent<MiniPlayerProps> = (_) => {
  const appBarRef = useRef(null)
  const { miniPlayer, setMiniPlayerContent } = useMiniPlayer()
  const classes = useStyles()

  const { open, data, title } = useMemo(() => {
    // parse lighthouse data
    if (miniPlayer?.title === 'Lighthouse') {
      return {
        ...miniPlayer,
        data: miniPlayer?.data ? JSON.parse(miniPlayer?.data) : null,
      }
    }
    return miniPlayer
  }, [miniPlayer])

  return (
    <Draggable handle={'.appBar'} allowAnyClick={false}>
      <Dialog
        fullScreen={false}
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
        <AppBar className={`appBar ${classes.appBar}`}>
          <Toolbar>
            <IconButton
              edge='start'
              color='secondary'
              onClick={setMiniPlayerContent(false)}
              aria-label='close'
            >
              <GrClose className='grIcon text-white' />
            </IconButton>
            <div
              className={
                'flex flex-1 place-items-center space-x-2 place-content-between'
              }
            >
              <p className='text-xl font-bold text-white truncate max-w-[70%]'>
                {title}
              </p>
              {title !== 'Lighthouse' ? (
                <div className='truncate'>
                  <Typography
                    variant='subtitle1'
                    className={classes.subTitle}
                    component={Link}
                    color={'secondary'}
                    href={`/website-details?url=${encodeURIComponent(data)}`}
                  >
                    {data}
                  </Typography>
                </div>
              ) : null}
            </div>
          </Toolbar>
        </AppBar>
        {title === 'Lighthouse' ? (
          <>
            {data && 'json' in data ? (
              <Lighthouse
                insight={data}
                id='fullscreen-lighthouse-report'
                lighthouseVisible
              />
            ) : (
              <div>Light house data not found.</div>
            )}
          </>
        ) : (
          <div>
            <AdaIframe url={data} miniPlayer />
            <Fab />
          </div>
        )}
      </Dialog>
    </Draggable>
  )
}

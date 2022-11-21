import React, { useRef, FunctionComponent, useMemo } from 'react'
import { AppBar, Dialog, Toolbar, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useMiniPlayer } from '@app/data'
import { Fab } from './fab'
import { Link } from './link'
import { GrClose } from 'react-icons/gr'
import Draggable from 'react-draggable'
import { Lighthouse } from './lighthouse'
import { AdaIframe } from '../ada/ada-iframe'
import Head from 'next/head'

const useStyles = makeStyles(() => ({
  root: {
    overflow: 'hidden',
  },
  miniPlayer: {
    overflow: 'hidden',
    right: 'auto !important',
    left: 'auto',
    minWidth: '45vw',
    maxHeight: '65vh',
    margin: '0px !important',
  },
}))

interface MiniPlayerProps {}

// a mini modal that appears that can be dragged across the screen.
export const MiniPlayer: FunctionComponent<MiniPlayerProps> = (_) => {
  const classes = useStyles()
  const appBarRef = useRef(null)
  const { miniPlayer, setMiniPlayerContent } = useMiniPlayer()

  const { open, data, title } = useMemo(() => {
    // parse lighthouse data
    if (miniPlayer?.title === 'Lighthouse') {
      return {
        ...miniPlayer,
        data: miniPlayer?.data ? JSON.parse(miniPlayer.data) : null,
      }
    }
    return miniPlayer
  }, [miniPlayer])

  return (
    <>
      <Head>
        <style>{`.MuiDialog-container > .MuiDialog-paperFullWidth { width: 100%; margin: 0; }`}</style>
      </Head>
      <Draggable handle={'.appBar'} allowAnyClick={false}>
        <Dialog
          fullScreen={false}
          ref={appBarRef}
          className={classes.miniPlayer}
          open={open}
          onClose={setMiniPlayerContent(false)}
          hideBackdrop
          disablePortal
          disableEnforceFocus
          maxWidth={'lg'}
          fullWidth
          disableAutoFocus
          scroll={'paper'}
        >
          <AppBar className={`appBar`} position='relative'>
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
                {data && title !== 'Lighthouse' ? (
                  <div className='truncate'>
                    <Link
                      href={`/website-details?url=${encodeURIComponent(data)}`}
                    >
                      {data}
                    </Link>
                  </div>
                ) : null}
              </div>
            </Toolbar>
          </AppBar>
          <div className={`w-full h-full`}>
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
          </div>
        </Dialog>
      </Draggable>
    </>
  )
}

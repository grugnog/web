/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { useEffect, useState, useRef, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import VisibilitySensor from 'react-visibility-sensor'
import Player from '@vimeo/player'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '12%',
    paddingBottom: '12%',
    overflow: 'visible',
  },
  card: {
    overflow: 'hidden',
    width: '100%',
    borderRadius: '4px',
    paddingBottom: '44.818182%',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
      height: '23vh',
      minHeight: 'auto',
    },
  },
  float: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  video: {
    width: '100%',
    height: '100%',
    '& iframe': {
      width: '100%',
      height: '100%',
    },
  },
  frame: {
    border: 0,
    willChange: 'transform',
  },
}))

function Inner({ isVisible }: { isVisible: boolean }) {
  const classes = useStyles()
  const [loaded, setLoaded] = useState<boolean>(false)
  const [muted, setMuted] = useState<number>(1)
  const playerRef = useRef<Player>()

  useEffect(() => {
    if (!loaded && isVisible) {
      setLoaded(true)
    }
  }, [loaded, isVisible])

  useEffect(() => {
    if (loaded) {
      ;(async () => {
        try {
          let player = playerRef?.current
          if (!playerRef?.current) {
            const video = document.querySelector('iframe') as HTMLIFrameElement
            player = video && new Player(video)
            playerRef.current = player
          }

          if (player) {
            if (isVisible && player?.play) {
              await player.play()
            } else if (!isVisible && player?.pause) {
              await player.pause()
            }
          }
        } catch (e) {
          console.error(e)
        }
      })()
    }
  }, [isVisible, loaded])

  const videoClassName = `${classes.video} ${classes.frame}`

  const onIframeEvent = async () => {
    setMuted((val: number) => (val ? 0 : 1))

    try {
      if (playerRef?.current) {
        const player = playerRef?.current
        if (muted) {
          await player?.play()
        } else {
          await player?.pause()
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className={classes.root} id='video-section'>
      <div
        className={classes.card}
        style={{ boxShadow: '#D1D5DB 0 1px 150px' }}
      >
        <div className={`${classes.float} ${classes.video}`}>
          <div className={`${classes.video}`}>
            {loaded ? (
              <Fragment>
                <iframe
                  src={`https://player.vimeo.com/video/389034032?title=0&byline=0&portrait=0&muted=${muted}&autoplay=1&controls=0&loop=1&texttrack=en`}
                  allowFullScreen
                  title='A11yWatch demo video'
                  className={videoClassName}
                  allow='autoplay'
                />
                <button
                  onClick={onIframeEvent}
                  aria-label={`${
                    muted ? 'play' : 'pause'
                  } a11ywatch demo video`}
                  className={'w-full h-full z-50'}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                />
              </Fragment>
            ) : (
              <div className={videoClassName} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function CtaVideo() {
  return (
    <VisibilitySensor partialVisibility>
      {({ isVisible }) => <Inner isVisible={isVisible} />}
    </VisibilitySensor>
  )
}

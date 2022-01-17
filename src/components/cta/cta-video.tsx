/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, {
  useEffect,
  useCallback,
  useState,
  useRef,
  Fragment,
} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import VisibilitySensor from 'react-visibility-sensor'
import Player from '@vimeo/player'
import type { Options } from '@vimeo/player'
import { SectionContainer } from '../general'

const useStyles = makeStyles((theme) => ({
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

class BasePlayer extends Player {
  public playing: boolean = false
  constructor(
    element: HTMLIFrameElement | HTMLElement | string,
    options?: Options
  ) {
    super(element, options)
    this.setPlaying = this.setPlaying.bind(this)
  }
  setPlaying(playing: boolean) {
    this.playing = playing
  }
}

function Inner({ isVisible }: { isVisible: boolean }) {
  const classes = useStyles()
  const [loaded, setLoaded] = useState<boolean>(false)
  const [muted, setMuted] = useState<number>(1)
  const playerRef = useRef<BasePlayer>()

  const playVideo = useCallback(async (play: boolean) => {
    const player = playerRef?.current

    if (!player) {
      return
    }

    if (play) {
      if (!player.playing) {
        await player.play()
      }
    } else if (!play) {
      if (player.playing) {
        await player.pause()
      }
    }
  }, [])

  useEffect(() => {
    if (!loaded && isVisible) {
      setLoaded(true)
    }
  }, [loaded, isVisible])

  useEffect(() => {
    if (loaded) {
      ;(async () => {
        try {
          if (!playerRef?.current) {
            const video = document.querySelector('iframe') as HTMLIFrameElement
            playerRef.current = video && new BasePlayer(video)
            const player = playerRef.current

            if (!player) {
              return
            }

            player.on('play', () => {
              player.setPlaying(true)
            })

            player.on('pause', () => {
              player.setPlaying(false)
            })
          }

          await playVideo(isVisible)
        } catch (e) {
          console.error(e)
        }
      })()
    }
  }, [isVisible, loaded, playVideo])

  const videoClassName = `${classes.video} ${classes.frame}`

  const onIframeEvent = useCallback(() => {
    setMuted((val: number) => {
      ;(async () => {
        try {
          await playVideo(!!val)
        } catch (e) {
          console.error(e)
        }
      })()

      return val ? 0 : 1
    })
  }, [setMuted, playVideo])

  return (
    <SectionContainer id='video-section'>
      <div
        className={classes.card}
        style={{ boxShadow: '#D1D5DB 0 1px 150px' }}
      >
        <h3 className='sr-only'>Multiple tools for a11y improvement</h3>
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
    </SectionContainer>
  )
}

export function CtaVideo() {
  return (
    <VisibilitySensor partialVisibility>
      {({ isVisible }) => <Inner isVisible={isVisible} />}
    </VisibilitySensor>
  )
}

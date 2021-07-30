/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import VisibilitySensor from 'react-visibility-sensor'
import Player from '@vimeo/player'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '12%',
    paddingBottom: '12%',
    overflow: 'hidden',
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
  const [loaded, setLoaded] = useState(false)
  // const [muted, setMuted] = useState(1)

  useEffect(() => {
    const video = document.querySelector('iframe') as HTMLIFrameElement

    if (!loaded && isVisible) {
      setLoaded(true)
    }

    const player = loaded ? new Player(video) : null

    if (loaded && video && player) {
      if (isVisible && player?.play) {
        player.play().catch((e) => {
          console.error(e)
        })
      } else if (!isVisible && player?.pause) {
        player.pause().catch((e) => {
          console.error(e)
        })
      }
    }
  }, [isVisible, loaded])

  const videoClassName = `${classes.video} ${classes.frame}`

  // const onIframeEvent = () => {
  //   setMuted((val) => (val ? 0 : 1))
  // }

  return (
    <div className={classes.root} id='video-section'>
      <div className={classes.card}>
        <div className={`${classes.float} ${classes.video}`}>
          <div className={classes.video}>
            {loaded ? (
              <iframe
                src={`https://player.vimeo.com/video/389034032?title=0&byline=0&portrait=0&muted=${1}&autoplay=1&controls=0&loop=1&texttrack=en`}
                allowFullScreen
                title='A11yWatch demo video'
                className={videoClassName}
              />
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

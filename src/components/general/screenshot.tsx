import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { FakeButtonContainer } from '@app/components/fake'
import { dev, cdn } from '@app/configs'
import Image from 'next/image'

const useStyles = makeStyles((theme) => ({
  centerAlign: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    ['& > img']: {
      textAlign: 'center',
      display: 'block',
      maxHeight: '38vh',
    },
  },
  container: {
    background: 'rgb(33,32,36)',
    overflow: 'hidden',
    maxHeight: '60vh',
    minWidth: '33%',
    borderRadius: 4,
  },
  screenshotContainer: {
    overflowY: 'scroll',
    maxHeight: 'inherit',
  },
  resetMargin: {
    marginLeft: 'auto',
    marginRight: 'auto',
    overflowY: 'hidden',
  },
  float: {
    float: 'left',
  },
  space: {
    marginRight: theme.spacing(2),
    marginLeft: '0px',
  },
}))

// TODO: REMOVE (FIX ALL OLD URLS )
const getBaseUrl = (baseURL: string) => {
  let url = baseURL

  if (url) {
    if (!dev) {
      url = url.replace('http://127.0.0.1:8090', cdn)
    } else {
      url = url.replace('127.0.0.1', 'localhost')
    }
  }

  return url
}

export function Screenshot({ src, url, resetMargin, width, height }: any) {
  const classes = useStyles()
  const imageSource = useMemo(() => getBaseUrl(src), [src])

  return (
    <div
      className={`${classes.container}${
        resetMargin ? ` ${classes.space}` : ''
      }`}
    >
      <FakeButtonContainer />
      <div
        className={`${classes.screenshotContainer}${
          resetMargin ? ` ${classes.resetMargin}` : ''
        }`}
      >
        <div className={resetMargin ? classes.float : classes.centerAlign}>
          <Image
            src={imageSource}
            alt={`screenshot of ${url} tested`}
            width={width ?? 450}
            height={height ?? 500}
          />
        </div>
      </div>
    </div>
  )
}

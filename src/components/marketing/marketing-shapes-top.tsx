/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Image from 'next/image'

const useStyles = makeStyles((theme) => ({
  shape: {
    position: 'absolute',
    pointerEvents: 'none',
  },
  oval1: {
    top: 50,
    left: 0,
    [theme.breakpoints.down('sm')]: {
      top: 10,
    },
  },
  oval2: {
    right: 220,
    top: -50,
    zIndex: 2,
    [theme.breakpoints.down('sm')]: {
      right: 0,
      top: -50,
      width: 221,
      height: 121,
    },
  },
}))

function MarketingShapesTop() {
  const classes = useStyles()

  return (
    <Fragment>
      <div className={`${classes.shape} ${classes.oval1}`}>
        <Image
          src={'/static/img/shapes/oval-1.svg'}
          height={241}
          width={230}
          alt=''
        />
      </div>
      <div className={`${classes.shape} ${classes.oval2}`}>
        <Image
          src={'/static/img/shapes/oval-2.svg'}
          height={320}
          width={380}
          priority
          alt=''
        />
      </div>
    </Fragment>
  )
}

export { MarketingShapesTop }

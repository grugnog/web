/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Chip, Tooltip } from '@material-ui/core'
import { Speed as SpeedIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  toolTip: {
    background: theme.palette.secondary.main,
    color: '#000',
    fontWeight: 600,
    fontSize: '0.85em',
  },
  icon: {
    marginRight: '8px',
  },
}))

export function PageLoad({
  pageLoadTime = {
    duration: 0,
  },
  mobile,
}: any) {
  const classes = useStyles()
  const durationToSeconds = pageLoadTime?.duration / 1000
  const fixedLength =
    String(durationToSeconds).length === 1 ? 1 : durationToSeconds < 1 ? 3 : 2

  return pageLoadTime?.duration ? (
    <Tooltip
      title={`Page load time is ${
        pageLoadTime?.durationFormated
      } at ${durationToSeconds.toFixed(fixedLength)} seconds`}
      placement={'right'}
    >
      <Chip
        className={classes.icon}
        variant='outlined'
        size='small'
        avatar={<SpeedIcon style={{ color: pageLoadTime.color }} />}
        label={mobile ? 'spd' : 'Speed'}
      />
    </Tooltip>
  ) : null
}

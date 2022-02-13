/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@material-ui/core'
import { Notifications as NotificationsIcon } from '@material-ui/icons'
import { strings } from '@app-strings'
import { useDynamicModal } from '@app/data'
import { enableNotifications } from '@app/lib'
import { ringKeyFrames } from '@app/styles'
import { useStyles } from './styles'

export function EnableNotifications() {
  const classes = useStyles()
  const { setModal } = useDynamicModal()

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.iconContainer}>
          <style>{ringKeyFrames}</style>
          <NotificationsIcon fontSize='large' className={classes.ringAnimate} />
        </div>
        <Typography variant='h6' component='h3'>
          {strings.alerts.enableNotificationsTitle}
        </Typography>
        <Typography
          variant='subtitle1'
          component='p'
          className={classes.about}
          gutterBottom
        >
          {strings.alerts.enableNotificationsDetail}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            setModal({ open: false })
            enableNotifications()
          }}
          variant='contained'
          className={classes.normal}
        >
          {strings.alerts.okay}
        </Button>
        <Button
          className={classes.see}
          onClick={() => {
            setModal({ open: false })
          }}
        >
          {strings.alerts.notNow}
        </Button>
      </CardActions>
    </Card>
  )
}

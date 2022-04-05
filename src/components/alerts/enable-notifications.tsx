import React from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@material-ui/core'
import { strings } from '@app-strings'
import { useDynamicModal } from '@app/data'
import { enableNotifications } from '@app/lib'
import { ringKeyFrames } from '@app/styles'
import { useStyles } from './styles'
import { GrNotification } from 'react-icons/gr'

export function EnableNotifications() {
  const classes = useStyles()
  const { setModal } = useDynamicModal()

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.iconContainer}>
          <style>{ringKeyFrames}</style>
          <GrNotification fontSize='large' className={classes.ringAnimate} />
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

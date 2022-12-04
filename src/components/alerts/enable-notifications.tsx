import React from 'react'
import { Card, CardActions, CardContent } from '@material-ui/core'
import { strings } from '@app-strings'
import { useDynamicModal } from '@app/data'
import { enableNotifications } from '@app/lib'
import { ringKeyFrames } from '@app/styles'
import { useStyles } from './styles'
import { GrNotification } from 'react-icons/gr'
import { Header3 } from '../general/header'
import { Button } from '../general'

export function EnableNotifications() {
  const classes = useStyles()
  const { setModal } = useDynamicModal()

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.iconContainer}>
          <style>{ringKeyFrames}</style>
          <GrNotification fontSize='large' />
        </div>
        <Header3>{strings.alerts.enableNotificationsTitle}</Header3>
        <p className={`${classes.about} pb-2`}>
          {strings.alerts.enableNotificationsDetail}
        </p>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            setModal({ open: false })
            enableNotifications()
          }}
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

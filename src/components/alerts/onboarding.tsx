import React from 'react'
import { useRouter } from 'next/router'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@material-ui/core'
import { strings } from '@app-strings'
import { useDynamicModal } from '@app/data'
import { ringKeyFrames } from '@app/styles'
import { _ONBOARDED } from '@app/lib/cookies/names'
import { useStyles } from './styles'
import { GrNotification } from 'react-icons/gr'

export function Onboarding() {
  const router = useRouter()
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
          {strings.onboarding.limitEmailsTitle}
        </Typography>
        <Typography
          variant='subtitle1'
          component='p'
          className={classes.about}
          gutterBottom
        >
          {strings.onboarding.limitEmailsDetail}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={async () => {
            setModal({ open: false })
            await router.push('/alerts')
          }}
          variant='contained'
          className={classes.normal}
        >
          Take me there
        </Button>
        <Button
          className={classes.see}
          onClick={() => {
            setModal({ open: false })
          }}
        >
          Close
        </Button>
      </CardActions>
    </Card>
  )
}

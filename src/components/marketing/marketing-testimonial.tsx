import React from 'react'
import { Avatar, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { strings } from '@app-strings'
import Image from 'next/image'
import { SectionContainer } from '../general'

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: 'center',
    display: 'flex',
  },
  bigAvatar: {
    backgroundColor: '#020202',
    color: '#757575',
    display: 'block',
    objectFit: 'contain',
    margin: '0 auto',
    border: '4px solid white',
    minHeight: '310px',
    minWidth: '310px',
    [theme.breakpoints.down('sm')]: {
      minHeight: 150,
      minWidth: 150,
    },
  },
  title: {
    fontWeight: 'normal',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.7em',
      textAlign: 'center',
    },
  },
  subtitle: {
    fontSize: '1.7em',
    color: '#5f6368',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3em',
      textAlign: 'center',
      flex: 1,
    },
  },
}))

export function MarketingTestimonial() {
  const classes = useStyles()

  return (
    <SectionContainer>
      <Grid
        container
        spacing={3}
        justifyContent='center'
        className={classes.container}
      >
        <Grid item xs={12} sm={6}>
          <Avatar className={classes.bigAvatar} variant='circular'>
            <Image
              alt={strings.testimonials[0].who}
              src='/img/gilbert.png'
              height={310}
              width={310}
            />
          </Avatar>
        </Grid>
        <Grid item xs={12} sm={6} container>
          <div>
            <Typography
              variant='h4'
              component='blockquote'
              gutterBottom
              className={classes.title}
            >
              {strings.testimonials[0].title}
            </Typography>
            <Typography
              variant='subtitle1'
              component='cite'
              className={classes.subtitle}
            >
              {strings.testimonials[0].who}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </SectionContainer>
  )
}

import React from 'react'
import { Avatar, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { strings } from '@app-strings'
import Image from 'next/image'
import { SectionContainer } from '../general'

const useStyles = makeStyles((theme) => ({
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
}))

export function MarketingTestimonial() {
  const classes = useStyles()

  return (
    <SectionContainer>
      <Grid container spacing={3} justifyContent='center' alignItems='center'>
        <Grid item xs={12} sm={4}>
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
          <div className='text-center'>
            <Typography
              variant='h4'
              component='blockquote'
              gutterBottom
              className={classes.title}
            >
              {strings.testimonials[0].title}
            </Typography>
            <cite className='text-[#5f6368] text-center text-lg'>
              {strings.testimonials[0].who}
            </cite>
          </div>
        </Grid>
      </Grid>
    </SectionContainer>
  )
}

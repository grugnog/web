import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { Link, SectionContainer } from '../general'
import Image from 'next/image'
import { useStyles } from './cta-intro'
import { CtaInputRest } from './searchbar/cta-input-rest'

interface CtaIntroRest {
  checker?: boolean
}
function CtaIntroRest({ checker }: CtaIntroRest) {
  const classes = useStyles()

  return (
    <SectionContainer>
      <div className={`${classes.root}`}>
        <div className={`${classes.block} mr-4`}>
          <Typography
            variant='h1'
            component={'h1'}
            className={`${classes.intro} text-6xl md:text-7xl bg-cover bg-center`}
          >
            {checker
              ? 'Real-Time Website Accessibility Checker'
              : 'Web Accessibility Monitoring'}
          </Typography>
          <Typography
            variant='subtitle1'
            component={'h2'}
            gutterBottom
            color={'textSecondary'}
          >
            {checker
              ? 'Test your web page inclusion and vitals'
              : 'Safeguard to a pleasant diverse experience'}
          </Typography>
          <Button
            component={Link}
            className={classes.submit}
            href={'/register'}
          >
            {'Sign up'}
          </Button>
          <CtaInputRest />
        </div>
        <div className={`${classes.block} ${classes.mobileHidden}`}>
          <Image
            src={`/img/${checker ? 'browser-stats' : 'intro'}.svg`}
            height={500}
            width={500}
            alt='Built to improve website accessibility'
            priority
          />
        </div>
      </div>
    </SectionContainer>
  )
}

export { CtaIntroRest }

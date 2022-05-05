import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { CtaInput } from './searchbar'
import { Link, SectionContainer } from '../general'
import Image from 'next/image'
import { GrFormDown } from 'react-icons/gr'
import { useStyles } from './intro-styles'

interface CtaIntro {
  checker?: boolean
}
function CtaIntro({ checker }: CtaIntro) {
  const classes = useStyles()

  return (
    <SectionContainer>
      <div className={`${classes.root}`}>
        <div className={`${classes.block}`}>
          <Typography
            variant='h1'
            component={'h1'}
            className={`${classes.intro} text-6xl md:text-7xl bg-cover bg-center`}
          >
            {checker
              ? 'Real-Time Website Accessibility Checker'
              : 'Web accessibility safeguard for the future'}
          </Typography>
          <Typography
            variant='subtitle1'
            component={'h2'}
            gutterBottom
            color={'textSecondary'}
          >
            {checker
              ? 'Test your web page inclusion and vitals'
              : 'Path to a pleasant diverse experience'}
          </Typography>
          <Button
            component={Link}
            className={classes.submit}
            href={'/register'}
          >
            {'Sign up'}
          </Button>
          <CtaInput />
        </div>
        <div className={`${classes.block} ${classes.mobileHidden}`}>
          <Image
            src={`/img/${checker ? 'browser-stats' : 'intro'}.svg`}
            height={500}
            width={500}
            alt='Built to improve website accessibility'
          />
        </div>
      </div>
      {checker ? null : (
        <div className={classes.join}>
          <p className='py-2'>JOIN THOUSANDS OF HIGHLY PRODUCTIVE TEAMS</p>
          <Image src={'/img/wave.svg'} height={8} width={120} alt='' />
          <a
            className={classes.bottomAnchor}
            href='#plans-section'
            aria-label='Scroll to introduction video'
          >
            <GrFormDown />
          </a>
        </div>
      )}
    </SectionContainer>
  )
}

export { CtaIntro }

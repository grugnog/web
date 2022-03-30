import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CtaInput } from './searchbar'
import { Link, SectionContainer } from '../general'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Image from 'next/image'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '0%',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  mobileHidden: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  detailedContainer: {
    paddingTop: '6%',
  },
  block: {
    flex: 1,
  },
  intro: {
    lineHeight: '0.92em',
  },
  submit: {
    marginTop: 10,
    width: 200,
    marginBottom: 20,
    border: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('sm')]: {
      width: '50%',
    },
    '&::after': {
      display: 'block',
      position: 'absolute',
      left: '100%',
      content: '"FREE forever."',
      textAlign: 'left',
      letterSpacing: 1,
      textTransform: 'uppercase',
      marginLeft: 20,
      maxWidth: 130,
      width: '100%',
      color: '#b9bec7',
      pointerEvents: 'none',
      top: 'auto',
    },
  },
  join: {
    marginBottom: '5%',
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    color: '#6e747f',
  },
  bottomAnchor: {
    display: 'block',
  },
}))

interface CtaIntro {
  checker?: boolean
}
function CtaIntro({ checker }: CtaIntro) {
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
              ? 'Test your webpage inclusion and vitals'
              : 'Safeguard to a pleasant inclusive experience'}
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
            priority
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
            <ExpandMore />
          </a>
        </div>
      )}
    </SectionContainer>
  )
}

export { CtaIntro }

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CtaInput } from './searchbar'
import { Link, SectionContainer } from '../general'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { MarketingTrustBy } from '../marketing'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '6%',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  mobileHidden: {
    [theme.breakpoints.down('sm')]: {
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
    backgroundImage: "url('./static/img/sky.webp')",
    marginBottom: 5,
    color: 'transparent',
  },
  submit: {
    marginTop: 10,
    width: 200,
    marginBottom: 20,
    [theme.breakpoints.down('sm')]: {
      width: '50%',
    },
    '&::after': {
      display: 'block',
      position: 'absolute',
      left: '100%',
      content: '"FREE forever."',
      font: '700 12px/17px Axiforma,Arial,serif',
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
    marginBottom: '12%',
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    color: '#7c828d',
  },
  bottomAnchor: {
    display: 'block',
  },
}))

function CtaIntro({ checker }: any) {
  const classes = useStyles()

  return (
    <SectionContainer className={'pt-20'}>
      <div
        className={`${classes.root}${
          checker ? ` ${classes.detailedContainer}` : ''
        }`}
      >
        <div className={classes.block}>
          <Typography
            variant='h1'
            component={'h1'}
            className={`${classes.intro} !text-transparent text-6xl md:text-7xl bg-clip-text bg-cover bg-center bg-blue-300 !text-opacity-100`}
          >
            {checker
              ? 'Check Your Web Accessibility'
              : 'Web Accessibility Automation'}
          </Typography>
          <Typography
            variant='subtitle1'
            component={'h2'}
            gutterBottom
            color={'textSecondary'}
          >
            {checker
              ? 'Test your website accessibility'
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
          <img
            src={`/static/img/${checker ? 'browser-stats' : 'intro'}.svg`}
            height={500}
            width={500}
            alt='accessibility stats tool'
          />
        </div>
      </div>
      {checker ? null : (
        <div className={classes.join}>
          <Typography variant='subtitle2' component={'p'} gutterBottom>
            JOIN THOUSANDS OF HIGHLY PRODUCTIVE TEAMS
          </Typography>
          <img src={'/static/img/wave.svg'} height={8} width={120} alt='' />
          <a
            className={classes.bottomAnchor}
            href='#video-section'
            aria-label='Scroll to introduction video'
          >
            <ExpandMore />
          </a>
          <MarketingTrustBy small />
        </div>
      )}
    </SectionContainer>
  )
}

export { CtaIntro }

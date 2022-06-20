import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { Link, SectionContainer } from '../general'
import Image from 'next/image'
import { CtaInputRest } from './searchbar/cta-input-rest'
import { useStyles } from './intro-styles'
import { GrFormDown } from 'react-icons/gr'

interface CtaIntroRest {
  checker?: boolean
}
function CtaIntroRest({ checker }: CtaIntroRest) {
  const classes = useStyles()

  return (
    <SectionContainer>
      <div className={`${classes.root} space-x-3`}>
        <div className={`${classes.block}`}>
          <h1
            className={`${classes.intro} font-bold text-5xl sm:text-7xl max-w-[90vw] py-3`}
          >
            {checker ? (
              'Fast and insightful web accessibility evaluations'
            ) : (
              <>
                Keep your website accessible{' '}
                <b className='text-blue-600 underline'>always</b>
              </>
            )}
          </h1>
          <Typography
            variant='subtitle1'
            component={'h2'}
            gutterBottom
            color={'textSecondary'}
          >
            {checker
              ? 'Test your web page inclusion and vitals with the help of artificial intelligence (AI)'
              : 'Path to a pleasant diverse experience that guides you along the way'}
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
          />
        </div>
      </div>
      {checker ? null : (
        <div className={classes.join}>
          <p className='py-2'>JOIN THOUSANDS OF HIGHLY PRODUCTIVE TEAMS</p>
          <Image
            src={'/img/wave.svg'}
            height={8}
            width={120}
            alt=''
            aria-hidden={true}
          />
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

export { CtaIntroRest }

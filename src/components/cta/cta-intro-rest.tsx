import React from 'react'
import { Button } from '@material-ui/core'
import Image from 'next/image'
import { Link, SectionContainer } from '../general'
import { CtaInputRest } from './searchbar/cta-input-rest'
import { CtaIntroBenches } from './cta-intro-benches'
import { useStyles } from './intro-styles'

interface CtaIntroRest {
  checker?: boolean
}
function CtaIntroRest({ checker }: CtaIntroRest) {
  const classes = useStyles()

  return (
    <SectionContainer>
      <div className={`${classes.root} gap-x-3`}>
        <div className={'flex-1'}>
          <h1
            className={`leading-[1.1em] font-bold text-5xl sm:text-7xl max-w-[90vw] py-3 lg:max-w-[48vw]`}
          >
            {checker ? (
              'Fast and insightful web accessibility evaluations'
            ) : (
              <>
                Build your next{' '}
                <b className='text-orange-600 underline'>website</b> the right
                way
              </>
            )}
          </h1>
          <h2 className='text-lg py-2'>
            {checker
              ? 'Test your web page inclusion and vitals fast'
              : 'Path to a pleasant diverse web experience for everyone'}
          </h2>
          <Button
            component={Link}
            className={classes.submit}
            href={'/register'}
          >
            Sign up
          </Button>
          <CtaInputRest />
        </div>
        <div className={'flex-1'}>
          {checker ? (
            <Image
              src={`/img/intro.svg`}
              height={500}
              width={500}
              alt='Built to improve website accessibility'
            />
          ) : (
            <CtaIntroBenches />
          )}
        </div>
      </div>
    </SectionContainer>
  )
}

export { CtaIntroRest }

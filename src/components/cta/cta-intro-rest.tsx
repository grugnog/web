import React from 'react'
import { Button } from '@material-ui/core'
import { Link, SectionContainer } from '../general'
import { CtaInputRest } from './searchbar/cta-input-rest'
import { CtaIntroBenches } from './cta-intro-benches'
import { useStyles } from './intro-styles'
import { IntroSvg } from '../svgs/intro'

interface CtaIntroRest {
  checker?: boolean
}
function CtaIntroRest({ checker }: CtaIntroRest) {
  const classes = useStyles()

  return (
    <SectionContainer>
      <div className={`block md:flex place-items-center pb-0 gap-x-3`}>
        <div className={'flex-1 pb-4'}>
          <h1
            className={`leading-[1.1em] font-bold text-5xl sm:text-7xl max-w-[90vw] py-3 lg:max-w-[48vw]`}
          >
            {checker ? (
              'Fast and insightful web accessibility evaluations'
            ) : (
              <>
                The #1 web{' '}
                <b className='text-orange-600 underline'>accessibility</b> API
              </>
            )}
          </h1>
          <h2 className='text-lg py-2'>
            {checker
              ? 'Test your web page inclusion and vitals fast'
              : 'Path to a pleasant diverse web experience for everyone'}
          </h2>
          <div className='py-3'>
            <Button
              component={Link}
              className={classes.submit}
              href={'/register'}
            >
              Sign up
            </Button>
          </div>
          <CtaInputRest />
        </div>
        <div className={'flex-1'}>
          {checker ? <IntroSvg /> : <CtaIntroBenches />}
        </div>
      </div>
    </SectionContainer>
  )
}

export { CtaIntroRest }

import { PropsWithChildren } from 'react'
import { Button } from '@material-ui/core'
import { Link } from '../typo/link'
import { SectionContainer } from '../containers/section-container'
import { IntroBenches } from './intro-benches'
import { IntroSvg } from '../../components/svgs/intro'
import { useStyles } from '../../components/cta/intro-styles'

interface MarketingIntro {
  checker?: boolean
}
function MarketingIntro({
  checker,
  children,
}: PropsWithChildren<MarketingIntro>) {
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
                Web <b className='text-blue-600 underline'>accessibility</b>{' '}
                without limits
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
          {children}
        </div>
        <div className={'flex-1 place-content-center'}>
          {checker ? <IntroSvg /> : <IntroBenches />}
        </div>
      </div>
    </SectionContainer>
  )
}

export { MarketingIntro }

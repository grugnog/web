import { PropsWithChildren } from 'react'
import { Button } from '@material-ui/core'
import { Link } from '../typo/link'
import { SectionContainer } from '../containers/section-container'
import { IntroBenches } from './intro-benches'
import { IntroSvg } from '../../components/svgs/intro'
import { useStyles } from '../../components/cta/intro-styles'
import { Header } from '@app/components/general/header'

interface MarketingIntro {
  checker?: boolean
}
function MarketingIntro({
  checker,
  children,
}: PropsWithChildren<MarketingIntro>) {
  const classes = useStyles()

  return (
    <SectionContainer container>
      <div className={'flex-1 pb-4'}>
        <Header>
          {checker ? (
            'Fast and insightful web accessibility evaluations'
          ) : (
            <>
              Elegant <b className='text-blue-600 underline'>accessibility</b>{' '}
              reporting and monitoring
            </>
          )}
        </Header>
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
    </SectionContainer>
  )
}

export { MarketingIntro }

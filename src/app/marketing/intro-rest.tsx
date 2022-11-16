import { PropsWithChildren } from 'react'
import { Link } from '../typo/link'
import { SectionContainer } from '../containers/section-container'
import { IntroBenches } from './intro-benches'
import { IntroSvg } from '../../components/svgs/intro'
import { Header } from '@app/components/general/header'

interface MarketingIntro {
  checker?: boolean
}
function MarketingIntro({
  checker,
  children,
}: PropsWithChildren<MarketingIntro>) {
  return (
    <SectionContainer container>
      <div className={'flex-1 pb-4'}>
        <Header>
          {checker ? (
            'Fast and insightful web accessibility evaluations'
          ) : (
            <>
              The web <b className='text-blue-600 underline'>accessibility</b>{' '}
              platform that scales.
            </>
          )}
        </Header>
        <h2 className='text-lg py-2'>
          {checker
            ? 'Test your web accessibility and vitals fast'
            : 'A11ywatch provides tools for testing web accessibility so you can build better software.'}
        </h2>
        <div className='py-3 pb-4 relative'>
          <Link
            className={`px-6 py-2 rounded border flex place-content-center w-40 after:text-sm after:content-['Free_start.'] after:left-[11.2rem] after:absolute after:pointer-events-none hover:bg-gray-100 font-semibold after:font-normal after:text-gray-500`}
            href={'/register'}
          >
            Sign up
          </Link>
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

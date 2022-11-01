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
        <div className='py-3 pb-4 relative'>
          <Link
            className={`px-6 py-2 rounded border flex place-content-center w-40 after:content-['Always_free.'] after:left-[12rem] after:absolute after:pointer-events-none hover:bg-gray-100 font-semibold after:font-normal`}
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

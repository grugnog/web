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
            'Precision with tools that work.'
          ) : (
            <>The web accessibility tool built for scale.</>
          )}
        </Header>
        {checker ? (
          <h2 className='text-lg py-2'>
            Test your web accessibility and vitals fast
          </h2>
        ) : (
          <div>
            <p className='text-base text-gray-800'>
              A11ywatch provides powerful tools for testing web inclusivity so
              you can build better software. We created a smart safeguard that
              prevents drastic issues across your website without hurting SEO
              and without overlays. Our system runs so fast speed becomes a
              feature.
            </p>
            <p className='text-base py-1 text-gray-700'>
              Get insight across every step of the way with multiple options
              like{' '}
              <strong>embed scripts, automated solutions, API, and more</strong>
              . Add custom actions and authentication for different use cases
              easy.
            </p>
          </div>
        )}
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

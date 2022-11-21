import { MarketingDrawer, Logo } from '@app/components/general'
import { strings } from '@app-strings'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { Header, Header3 } from '@app/components/general/header'
import { SectionContainer } from '@app/app/containers/section-container'

function BrandAssets({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <SectionContainer container block>
        <Header>Brand assets</Header>

        <div className='max-w-xl container mx-auto'>
          <h2 className='text-2xl'>
            Download official {strings.appName} logos
          </h2>
          <p className='text-sm'>
            All {strings.appName} trademarks, logos, or other brand elements can
            never be modified or used for any other purpose other than to
            represent {strings.appName} LLC.
          </p>
        </div>

        <div className={'py-12'}>
          <div className='flex flex-col md:flex-row flex-1 border rounded px-12 py-16 gap-x-4 gap-y-2'>
            <div className='flex flex-1 place-items-center place-content-center space-x-2'>
              <Logo width={100} height={62} id={'paint1_linear_2_23'} />
              <strong className='text-xl md:text-3xl lg:text-4xl'>
                A11yWatch
              </strong>
            </div>
            <div className='space-y-2 flex-1'>
              <p className='text-xl md:text-3xl lg:text-4xl'>
                {strings.appName} logos
              </p>
              <p>
                Download {strings.appName} official logos, including as{' '}
                {`SVG's`}. Do not use any other color for the wordmark.
              </p>
              <form method='get' action='/brand/assets/a11ywatch-logos.zip'>
                <button
                  className='border relative cursor-pointer inline-flex items-center space-x-2 text-center font-regular transition ease-out duration-200 rounded outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600  shadow-sm text-xs px-2.5 py-1'
                  type='submit'
                >
                  <span className='truncate'>Download logo kit</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='14'
                    height='14'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='sbui-icon '
                  >
                    <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
                    <polyline points='7 10 12 15 17 10'></polyline>
                    <line x1='12' y1='15' x2='12' y2='3'></line>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>

        <Header3>Brand usage rules</Header3>
        <p>
          Please do not alt the logos outside of the default look without
          contacting us for approval.
        </p>
      </SectionContainer>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { BrandAssets },
  {
    description: `Get ${strings.appName} brand assets here. Show your support by displaying a link with our logo on your website.`,
  }
)

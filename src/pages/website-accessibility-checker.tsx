import { Fragment } from 'react'
import { MarketingDrawer } from '@app/components/general'
import { CtaIntroRest } from '@app/components/cta/cta-intro-rest'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { MarketingBottomTemporaryDrawer } from '@app/components/modal'
import { GrCloudSoftware, GrPerformance, GrCluster } from 'react-icons/gr'
import { DOMAIN_NAME } from '@app/configs'
import { LinkPrefetch } from '@app/components/general/link'

function WebsiteAccessibilityChecker({ name }: PageProps) {
  return (
    <Fragment>
      <MarketingDrawer
        title={name}
        navPosition={'relative'}
        maxWidth={'xl'}
        index
      >
        <CtaIntroRest checker />
        <div className='px-4 max-w-[800px] space-y-2 py-6'>
          <div>
            <h3 className='text-2xl font-bold'>
              Live web accessibility testing
            </h3>
            <p className='text-lg'>
              Scan your website and get near instant results free. Sign up today
              to get site-wide monitoring and other web accessibility
              improvement tools right in the browser or your own servers. Theres
              multiple entry points to get started keeping your website
              inclusive. All test are done using a live browser and a real dom
              to run on.
            </p>
          </div>
          <div>
            <h4 className='text-2xl font-bold'>
              Fast website inclusion results
            </h4>
            <p className='text-lg'>
              Optimize your workflow on tackling issues while learning how to
              stay accessible for the long run. A11yWatch was built with the
              speed in mind to give you real time results with minimal downtime
              even if you have thousands of pages.
            </p>
          </div>
          <div>
            <h4 className='text-2xl font-bold'>Conformance to WCAG2.1 +</h4>
            <p className='text-lg'>
              Extending WCAG2.1 as the foundation, we also look at other areas
              of the guidelines that have yet to be introduced and other
              additions that blend into web accessibility including WCAG3.0. Get
              recommended descriptions for missing alt tags that can included
              directly into your code or injected with the help of{' '}
              <strong>Machine Learning and AI</strong>.
            </p>
          </div>
        </div>
        <div className='flex flex-col pb-6 pt-10'>
          <div className='px-4 space-y-2'>
            <h5 className='py-2 pb-3 text-3xl font-bold'>
              Open-Source tools that scale
            </h5>
            <div className='grid lg:grid-cols-3 gap-y-6 gap-x-6 place-items-start'>
              <div className='flex gap-x-1 gap-y-2 place-items-center'>
                <div className='flex place-items-center pr-6'>
                  <GrCluster className='grIcon h-[50px] w-[50px]' />
                </div>
                <div>
                  <h6 className='text-xl font-bold'>
                    Keep your content inclusive
                  </h6>
                  <p className='text-lg'>
                    Configurable testing that helps with real applications.
                  </p>
                </div>
              </div>
              <div className='flex gap-x-1 gap-y-2 place-items-center'>
                <div className='flex place-items-center pr-6'>
                  <GrCloudSoftware className='grIcon h-[50px] w-[50px]' />
                </div>
                <div>
                  <h6 className='text-xl font-bold'>
                    It gets you testing on the go
                  </h6>
                  <p className='text-lg'>
                    Use the system on any device or consume the
                    <LinkPrefetch
                      href={`${DOMAIN_NAME}/api-info`}
                      className={'text-blue-700'}
                    >
                      OpenAPI, gRPC, and GraphQL endpoints
                    </LinkPrefetch>
                    .
                  </p>
                </div>
              </div>
              <div className='flex gap-x-1 gap-y-2 place-items-center'>
                <div className='flex place-items-center pr-6'>
                  <GrPerformance className='grIcon h-[50px] w-[50px]' />
                </div>
                <div>
                  <h6 className='text-xl font-bold'>
                    Web vitals that make a difference
                  </h6>
                  <p className='text-lg'>
                    Opt in to include insightful{' '}
                    <a
                      href={
                        'https://developers.google.com/web/tools/lighthouse'
                      }
                      target='_blank'
                      rel='noreferrer'
                      className='text-blue-700'
                    >
                      Google Lighthouse
                    </a>{' '}
                    reports and other metrics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MarketingDrawer>
      <MarketingBottomTemporaryDrawer />
    </Fragment>
  )
}

export default metaSetter(
  { WebsiteAccessibilityChecker },
  {
    title: 'Web Acessibility Checker',
    description: `Check the accessibility of your web page today. Improve your web inclusion with accessibility testing, reports, monitoring, and much more.`,
    rest: true,
    intercom: true,
  }
)

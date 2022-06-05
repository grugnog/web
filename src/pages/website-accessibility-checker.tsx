import React, { Fragment } from 'react'
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
        <div className='px-4 max-w-[800px] space-y-2'>
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
              Optimize your workflow on tackling web inclusion issues while
              learning how to stay accessible for the long run. If you have
              thousands of pages, A11yWatch was built with the speed in mind to
              give you real time results with minimal downtime.
            </p>
          </div>
          <div>
            <h4 className='text-2xl font-bold'>Conformance to WCAG2.1 +</h4>
            <p className='text-lg'>
              Extending WCAG2.1 as the foundation, we also look at other areas
              of the guidelines that have yet to be introduced and other
              additions that blend into web accessibility including WCAG3.0.
            </p>
          </div>
        </div>
        <div className='place-items-center flex flex-col pb-6 pt-10'>
          <div className='px-4 max-w-[800px] space-y-2'>
            <h5 className='py-2 text-2xl font-bold'>
              Open-Source tools designed for the job
            </h5>
            <div className='flex flex-col md:flex-row gap-x-6 gap-y-2 p-6 border rounded'>
              <div className='flex place-items-center px-6'>
                <GrCluster className='grIcon h-[60px] w-[60px]' />
              </div>
              <div>
                <h6 className='text-xl font-bold'>Target a broader audience</h6>
                <p className='text-lg'>
                  We built the system to utilize every drop of performance
                  making it possible to scan up to 1,000 pages within a minute.
                  Even the largest websites and E-commerce websites can run full
                  multi page reports with little downtime. Configure the crawler
                  with the level of WCAG standard, user agents, page headers,
                  and other properties that help when crawling real world
                  applications.
                </p>
              </div>
            </div>
            <div className='flex flex-col md:flex-row gap-x-6 gap-y-2 p-6 border rounded'>
              <div className='flex place-items-center px-6'>
                <GrCloudSoftware className='grIcon h-[60px] w-[60px]' />
              </div>
              <div>
                <h6 className='text-xl font-bold'>
                  It gets you testing on the go
                </h6>
                <p className='text-lg'>
                  Every page on our website is built to handle across many
                  platforms and devices. We take a mobile approach so that our
                  content can be used on the go where ever, when ever on your
                  smart phone or tablet. Our{' '}
                  <LinkPrefetch
                    href={`${DOMAIN_NAME}/api-info`}
                    className={'text-blue-700'}
                  >
                    API
                  </LinkPrefetch>{' '}
                  is made so that anything you can do on our application can be
                  done outside of our domain.
                </p>
              </div>
            </div>
            <div className='flex flex-col md:flex-row gap-x-6 gap-y-2 p-6 border rounded'>
              <div className='flex place-items-center px-6'>
                <GrPerformance className='grIcon h-[80px] w-[80px]' />
              </div>
              <div>
                <h6 className='text-xl font-bold'>
                  Web vitals that make a difference
                </h6>
                <p className='text-lg'>
                  Opt in to include insightful{' '}
                  <a
                    href={'https://developers.google.com/web/tools/lighthouse'}
                    target='_blank'
                    rel='noreferrer'
                    className='text-blue-700'
                  >
                    Google Lighthouse
                  </a>{' '}
                  reports across all of your web pages in the dashboard. View
                  detailed core web vitals that can help improve your
                  accessibility, performance, SEO and much more.
                </p>
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
    description: `Check the accessibility of your web page today. Improve your web inclusion with accessibility testing, reports, recommendations, monitoring, and much more.`,
    rest: true,
    intercom: true,
  }
)

import React, { Fragment } from 'react'
import { MarketingDrawer } from '@app/components/general'
import { CtaIntroRest } from '@app/components/cta/cta-intro-rest'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { MarketingBottomTemporaryDrawer } from '@app/components/modal'
import { GrAccessibility } from 'react-icons/gr'

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
              inclusive.
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
        <div className='px-4 py-6'>
          <div className='p-3 border-2 rounded text-base flex space-x-3 place-items-center'>
            <GrAccessibility className='grIcon h-[40px] w-[40px]' />
            <p>
              When it comes to a11y we have you covered on the automated and
              manual portions. We can handle the parts where automatic fixes can
              be applied to a degree. The manual aspects we give you a little
              help to figure it out with recommendations. The steps we use
              bridge the gaps that cause the most painful downtime when it comes
              to testing.
            </p>
          </div>
        </div>
        <div className='px-4 max-w-[800px] space-y-2'>
          <h3 className='py-2 text-2xl font-bold'>
            Open-Source web accessibility tools for every situation
          </h3>
          <div>
            <h4 className='text-xl font-bold'>
              Accessibility checking at lightspeed
            </h4>
            <p className='text-lg'>
              We built the system to utilize every drop of performance making it
              possible to scan up to 1,000 pages within a minute. Even the
              largest websites and E-commerce websites can run full multi page
              reports with little downtime. Configure the crawler with the level
              of WCAG standard, User Agent, page headers, and other properties
              that help when crawling real world applications. We also helped
              make the fastest{' '}
              <a
                href={'https://github.com/madeindjs/spider'}
                target='_blank'
                rel='noreferrer'
                className='text-blue-600'
              >
                open-source
              </a>{' '}
              web crawler along with some other software libraries on Github.
              Our system uses the package internally in a Rust lang based{' '}
              <a
                href={'https://github.com/a11ywatch/crawler'}
                target='_blank'
                rel='noreferrer'
                className='text-blue-600'
              >
                micro-service
              </a>{' '}
              with some{' '}
              <a
                href={'https://grpc.io'}
                target='_blank'
                rel='noreferrer'
                className='text-blue-600'
              >
                gRPC
              </a>{' '}
              adjustments.
            </p>
          </div>
          <div>
            <h4 className='text-xl font-bold'>
              Universal accessibility platform and API
            </h4>
            <p className='text-lg'>
              Every page on our website is built to handle across many platforms
              and devices. We take a mobile approach so that our content can be
              used on the go where ever, when ever on your smart phone or
              tablet. Our API is made so that anything you can do on our
              application can be done via network call to our system.
            </p>
          </div>
          <div>
            <h4 className='text-xl font-bold'>
              Lighthouse and other web vitals included
            </h4>
            <p className='text-lg'>
              Opt in to include insightful{' '}
              <a
                href={'https://developers.google.com/web/tools/lighthouse'}
                target='_blank'
                rel='noreferrer'
                className='text-blue-600'
              >
                lighthouse
              </a>{' '}
              reports across all of your web pages beautifully in the dashboard.
              View detailed core web vitals that can help improve your
              accessibility, performance, and much more.
            </p>
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
    description: `Check the accessibility of your web page today. Improve your web inclusion with accessibility testing, reports, recommendations, monitoring, and instant accessibility fixes.`,
    rest: true,
    intercom: true,
  }
)

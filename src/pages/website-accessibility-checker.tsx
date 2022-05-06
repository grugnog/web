import React, { Fragment } from 'react'
import { MarketingDrawer } from '@app/components/general'
import { CtaIntroRest } from '@app/components/cta/cta-intro-rest'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { MarketingBottomTemporaryDrawer } from '@app/components/modal'

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
              Scan your website and get lightning fast results for free. Sign up
              today to get site-wide monitoring and other web accessibility
              improvement tools right in the browser or your own servers. Theres
              multiple entry points to get started keeping your website
              inclusive.
            </p>
          </div>
          <div>
            <h4 className='text-2xl font-bold'>
              Fast web accessibility results
            </h4>
            <p className='text-lg'>
              Optimize your workflow on tackling web inclusion issues while
              learning how to stay accessible for the long run. If you have
              thousands of pages, A11yWatch was built with the speed in mind to
              give you real time results with minimal downtime.
            </p>
          </div>
          <div>
            <h4 className='text-2xl font-bold'>Conformance to WCAG2.1</h4>
            <p className='text-lg'>
              Extending WCAG2.1 as the foundation, we also look at other areas
              of the guidelines that have yet to be introduced and other
              additions that blend into web accessibility.
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

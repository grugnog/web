import { MarketingDrawer } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { companyName } from '@app/configs'
import { Header, Header2, Header3 } from '@app/components/general/header'
import { SectionContainer } from '@app/app/containers/section-container'
import { Fragment, Key } from 'react'

interface ListLog {
  date: string
  updates: string[]
}

const list: ListLog[] = [
  {
    date: 'November 2022',
    updates: [
      'Scaled pricing plans are now live with all features 🥳!',
      'Remove middleware authentication dashboard url rewrite.',
    ],
  },
  {
    date: 'October 2022',
    updates: ['Security improvements and rate limiting updates.'],
  },
  {
    date: 'September 2022',
    updates: ['Improve application concurrency limits.'],
  },
  {
    date: 'August 2022',
    updates: ['Add public gRPC entry for website report gathering.'],
  },
  {
    date: 'July 2022',
    updates: [
      'Fix email password reset handling.',
      'Add paginated API endpoints for base models.',
    ],
  },
  {
    date: 'June 2022',
    updates: [
      'TLD and subdomain crawl bug fixes.',
      'API bug fixes across some endpoints.',
    ],
  },
  {
    date: 'May 2022',
    updates: [
      'OpenAPI crawl expose and crawl fixes across multi domains.',
      'Add mobile viewport scan option toggle.',
    ],
  },
  {
    date: 'April 2022',
    updates: ['Iframe render security improvements.'],
  },
  {
    date: 'March 2022',
    updates: ['Improve portability across systems and reduce memory usage.'],
  },
  {
    date: 'February 2022',
    updates: ['Add Pagespeed reports.'],
  },
  {
    date: 'January 2022',
    updates: ['Fix first party auth handling.'],
  },
  {
    date: 'December 2021',
    updates: ['Remove universal analytics tracking.'],
  },
  {
    date: 'July 2021',
    updates: ['Add yearly plans.'],
  },
]

function ChangeLog({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <SectionContainer container block>
        <Header>{`Changelog`}</Header>
        <p className='text-lg'>
          Get the insight on current progress and new updates to come.
        </p>

        <Header2>Current status</Header2>
        <p className='text-lg'>
          We spent several months upgrading our technology stack for future
          development. Now {`we're`} working on huge improvements to our
          dashboard, improving some of the processing across our accessibility
          service, and improving system portablity.
        </p>

        <>
          {list.map((item) => {
            return (
              <Fragment key={item.date as Key}>
                <ul className='list-disc'>
                  <Header3>{item.date}</Header3>
                  {item.updates.map((li, i) => {
                    return (
                      <li
                        key={`changeloglist-${i}`}
                        className={'text-lg text-gray-800'}
                      >
                        {li}
                      </li>
                    )
                  })}
                </ul>
              </Fragment>
            )
          })}
        </>
      </SectionContainer>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { ChangeLog },
  {
    description: `See recent and planned updates across ${companyName}, web accessibility software .`,
  }
)

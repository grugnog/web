import React, { Fragment } from 'react'
import { MarketingDrawer } from '@app/components/general'
import { TestView } from '@app/components/general/test-view'
import { WithSwipeModal as SwipeableTemporaryDrawer } from '@app/components/adhoc'
import type { PageProps } from '@app/types'
import { metaSetter } from '@app/utils'

// THIS page is handled by a redirect.
function Test({ name }: PageProps) {
  return (
    <Fragment>
      <MarketingDrawer initClosed={true} renderCtaSearch title={name}>
        <h1 className='sr-only'>Test out A11yWatch</h1>
        <TestView marketing />
      </MarketingDrawer>
      <SwipeableTemporaryDrawer />
    </Fragment>
  )
}

export default metaSetter(
  { Test },
  {
    title: 'WCAG web accessibility playground example',
    description:
      'Free website accessibility testing and live website viewer. View your website in realtime using the playground to visualize and fix issues.',
    gql: true,
  }
)

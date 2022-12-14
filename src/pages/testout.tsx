import { Fragment } from 'react'
import { MarketingDrawer } from '@app/components/general'
import { TestView } from '@app/components/general/test-view'
import { WithSwipeModal as SwipeableTemporaryDrawer } from '@app/components/adhoc'
import type { PageProps } from '@app/types'
import { metaSetter } from '@app/utils'
import { companyName, DOMAIN_NAME, getAPIRoute } from '@app/configs'
import { GetStaticProps } from 'next'
import { HomeManager } from '@app/managers'

// THIS page is handled by a redirect.
function Test({ name, website }: PageProps) {
  return (
    <Fragment>
      <MarketingDrawer initClosed={true} renderCtaSearch title={name}>
        <h1 className='sr-only'>Test out A11yWatch</h1>
        <TestView marketing website={website} />
      </MarketingDrawer>
      <SwipeableTemporaryDrawer />
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const apiEndpoint = `${getAPIRoute('api', true)}/scan-simple`
  let data = null

  try {
    const res = await fetch(apiEndpoint, {
      method: 'POST',
      body: JSON.stringify({
        websiteUrl: HomeManager.getTestFrameUrl,
      }),
      headers: {
        'Content-Type': 'application/json',
        Referer: DOMAIN_NAME,
      },
    })

    const json = (await res.json()) ?? {}

    if (json) {
      data = json.data
    }
  } catch (e) {
    console.error(e)
  }

  return {
    props: {
      website: data,
    },
    revalidate: 3600 * 24, // every 24 hours
  }
}

export default metaSetter(
  { Test },
  {
    title: `${companyName}: Try web accessibility playground`,
    description:
      'Free website accessibility testing sandbox. View your website in realtime using the playground to visualize and fix issues, validate contrast, and much more.',
    gql: true,
    rest: true,
  }
)

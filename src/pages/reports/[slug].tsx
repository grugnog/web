import type { PageProps } from '@app/types'
import type { GetServerSideProps } from 'next'
import React, { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'
import { MarketingDrawer, PageTitle } from '@app/components/general'
import { ReportView } from '@app/components/ada'
import { metaSetter } from '@app/utils'
import { getAPIRoute } from '@app/configs/api-route'
import { UserManager } from '@app/managers'

function Reports({ name, website }: PageProps) {
  const { url, domain } = website ?? { domain: '', url: 'Not Found' }
  const [authenticated, setAuthed] = useState<boolean>(false)

  // use non gql auth method
  useEffect(() => {
    if (UserManager.loggedIn) {
      setAuthed(true)
    }
  }, [])

  return (
    <Fragment>
      <Head>
        <title>{`Web Accessibility Report - ${url} | A11yWatch`}</title>
        <meta
          property='description'
          content={`A detailed web accessibility report for ${url}. The report follows ADA and WCAG specifications.`}
          key='description'
        />
      </Head>
      <MarketingDrawer
        title={url || name}
        maxWidth='xl'
        initClosed={true}
        authenticated={authenticated}
      >
        <div className='sr-only'>
          <PageTitle>{`Report: ${domain || 'page'}`}</PageTitle>
        </div>
        <ReportView
          website={website}
          disablePlayground={true}
          disableTabs
          download
          authenticated={authenticated}
        />
      </MarketingDrawer>
    </Fragment>
  )
}

const getWebsite = async (url: string) => {
  let website
  let res

  const apiRoute = `${getAPIRoute(
    'api',
    true
  )}/get-website?q=${encodeURIComponent(url)}`

  try {
    res = await fetch(apiRoute)
  } catch (e) {
    console.error(e)
  }

  try {
    if (res && res?.ok) {
      website = await res.json()
    }
  } catch (e) {
    console.error(e)
  }

  return website
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params ?? {}

  if (!slug) {
    return {
      notFound: true,
    }
  }

  let url: string | string[] = slug

  // if its an array for dynamic routes [ old next.js v9 ]
  if (Array.isArray(slug) && slug.length) {
    ;[url] = slug
  }

  let website
  let targetUrl = url + ''

  try {
    website = await getWebsite(targetUrl)
  } catch (e) {
    console.error(e)
  }

  if (!website) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { website },
  }
}

export default metaSetter(
  { Reports },
  {
    gql: true,
    description: 'Website detailed report with WCAG issues and how to fix.',
  }
)

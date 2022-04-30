import type { PageProps } from '@app/types'
import type { GetServerSideProps } from 'next'
import React, { Fragment } from 'react'
import Head from 'next/head'
import { MarketingDrawer, PageTitle } from '@app/components/general'
import { ReportView } from '@app/components/ada'
import { metaSetter } from '@app/utils'
import { getAPIRoute } from '@app/configs/api-route'

function Reports({ name, website }: PageProps) {
  const { url, domain } = website ?? { domain: '', url: 'Not Found' }

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
      <MarketingDrawer title={url || name} maxWidth='xl' initClosed={true}>
        <div className={'py-2 px-4'}>
          <PageTitle>{`Report: ${domain || 'page'}`}</PageTitle>
          <ReportView website={website} disablePlayground={true} />
        </div>
      </MarketingDrawer>
    </Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params ?? {}

  if (!slug) {
    return {
      notFound: true,
    }
  }

  const [websiteUrl, timestamp] = Array.isArray(slug) ? slug : []

  let website

  try {
    let res = await fetch(
      `${getAPIRoute('api', true)}/get-website?q=${websiteUrl}${
        timestamp ? `&timestamp=${timestamp}` : ''
      }`
    )

    if (res && res?.ok) {
      website = await res.json()
    }

    // retry without timestamp. TODO: LOOK INTO TIMESTAMP INCONSISTENCIES
    if (!website) {
      res = await fetch(
        `${getAPIRoute('api', true)}/get-website?q=${websiteUrl}`
      )

      if (res && res?.ok) {
        website = await res.json()
      }
    }
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
  }
)

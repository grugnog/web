/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import type { PageProps } from '@app/types'
import type { GetStaticProps } from 'next'
import React, { Fragment } from 'react'
import Head from 'next/head'
import { MarketingDrawer, PageTitle } from '@app/components/general'
import { ReportView } from '@app/components/ada'
import { metaSetter } from '@app/utils'

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
          {website ? (
            <ReportView website={website} disablePlayground={true} />
          ) : null}
        </div>
      </MarketingDrawer>
    </Fragment>
  )
}

export async function getStaticPaths() {
  // Maybe pre-render top domains
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params ?? {}

  if (!slug) {
    return {
      notFound: true,
    }
  }

  const [websiteUrl, timestamp] = Array.isArray(slug) ? slug : []

  let website

  if (websiteUrl === 'static') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const { getAPIRoute } = await import('@app/configs')

  try {
    const res = await fetch(
      `${getAPIRoute('api', true)}/get-website?q=${websiteUrl}${
        timestamp ? `&timestamp=${timestamp}` : ''
      }`
    )
    if (res && res?.ok) {
      website = await res.json()
    }
  } catch (e) {
    console.error(e)
  }

  return !website
    ? {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    : {
        props: { website },
        revalidate: timestamp ? false : 86400,
      }
}

export default metaSetter({ Reports })

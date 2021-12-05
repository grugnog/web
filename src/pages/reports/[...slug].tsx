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
import { getAPIRoute } from '@app/configs'

function Reports({ name, website }: PageProps) {
  const { url, domain } = website ?? { domain: '', url: 'Not Found' }

  return (
    <Fragment>
      <Head>
        <title>{`Web Accessibility report for ${url} - A11yWatch`}</title>
        <meta
          property='description'
          content={`A detailed WCAG 2.1 report for ${url} that can be used by A11yWatch`}
          key='description'
        />
      </Head>
      <MarketingDrawer title={url || name} maxWidth='xl'>
        <PageTitle>{`Report: ${domain || 'page'}`}</PageTitle>
        {website ? (
          <ReportView website={website} disablePlayground={true} />
        ) : null}
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

  const isStatic = slug[0] === 'static'

  if (isStatic) {
    return {
      notFound: true,
    }
  }

  const websiteUrl = slug && slug.length ? slug[0] : null
  const timestamp = slug && slug.length === 2 ? slug[1] : null

  let website

  try {
    const res = await fetch(
      `${getAPIRoute()}/get-website?q=${websiteUrl}${
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
        revalidate: 600,
      }
}

export default metaSetter({ Reports })

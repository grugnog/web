/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import type { PageProps } from '@app/types'
import type { GetServerSideProps } from 'next'
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { q, timestamp } = context.query
  let website

  try {
    const res =
      q &&
      (await fetch(
        `${getAPIRoute()}/get-website?q=${q}${
          timestamp ? `&timestamp=${timestamp}` : ''
        }`
      ))
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
      }
}

export default metaSetter({ Reports })

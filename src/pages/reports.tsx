/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import type { PageProps } from '@app/types'
import { GetServerSideProps } from 'next'
import React, { Fragment } from 'react'
import Head from 'next/head'
import { MarketingDrawer, PageTitle } from '@app/components/general'
import { ReportView } from '@app/components/ada'
import { metaSetter } from '@app/utils'
import { getAPIRoute } from '@app/configs'

function Reports({ name, website }: PageProps) {
  return (
    <Fragment>
      <MarketingDrawer title={website?.url || name} maxWidth='xl'>
        <Head>
          <title>{`Web Accessibility report for ${website?.url} - A11yWatch`}</title>
          <meta
            property='description'
            content={`A detailed WCAG 2.1 report for ${website?.url} that can be used by A11yWatch`}
            key='description'
          />
        </Head>
        <PageTitle>{`Report: ${website?.domain || 'page'}`}</PageTitle>
        <ReportView website={website} disablePlayground={true} />
      </MarketingDrawer>
    </Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const redirect = {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }

  try {
    const { q, timestamp } = context.query

    let website

    if (q) {
      const res = await fetch(
        `${getAPIRoute()}/get-website?q=${q}${
          timestamp ? `&timestamp=${timestamp}` : ''
        }`
      )
      website = await res.json()
    }

    if (!website) {
      return redirect
    }

    return {
      props: { website },
    }
  } catch (e) {
    console.error(e)
    return redirect
  }
}

export default metaSetter({ Reports })

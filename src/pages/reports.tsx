/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import type { PageProps } from '@app/types'
import { GetServerSideProps } from 'next'
import React, { Fragment } from 'react'
import Head from 'next/head'
import { MarketingDrawer } from '@app/components/general'
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
            content={`A detailed WCAG 2.1 report for ${website?.url} that can be used to audit by A11yWatch`}
            key='description'
          />
        </Head>
        <ReportView website={website} disablePlayground={true} />
      </MarketingDrawer>
    </Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${getAPIRoute()}/get-website?q=${context?.query?.q}`)
  const website = await res.json()

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

export default metaSetter({ Reports })

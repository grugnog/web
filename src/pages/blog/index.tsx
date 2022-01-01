/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import type { PageProps } from '@app/types'
import type { GetStaticProps } from 'next'
import React, { Fragment } from 'react'
import Head from 'next/head'
import { metaSetter } from '@app/utils'
import { getBlogPage } from '@app/lib'

function Blog({ website }: PageProps) {
  return (
    <Fragment>
      <Head>
        <title>{`Web Accessibility Blog | A11yWatch`}</title>
        <meta
          property='description'
          content={`A blog page for a11ywatch. The blog follows ADA and WCAG specifications.`}
          key='description'
        />
      </Head>
      {website ? <div dangerouslySetInnerHTML={{ __html: website }} /> : null}
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  let website: string | undefined = ''

  try {
    const { html } = await getBlogPage('')

    website = html
  } catch (e) {
    console.error(e)
  }

  return {
    props: { website },
    revalidate: 60 * 12 * 2,
  }
}

export default metaSetter(
  { Blog },
  {
    gql: false,
  }
)

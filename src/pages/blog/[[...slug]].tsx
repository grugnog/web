/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import Head from 'next/head'
import { metaSetter } from '@app/utils/meta-setter'
import { getBlogPage } from '@app/lib/get-blog'
import { WordPressPage } from '@app/components/blog/wordpress-page'
import type { BlogPageProps } from '@app/types'
import type { GetStaticProps } from 'next'

function Blogs(props: BlogPageProps) {
  return (
    <>
      <Head>
        <link rel='alternate' hrefLang='en' />
      </Head>
      <WordPressPage {...props} />
    </>
  )
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params ?? {}
  const websiteUrl = Array.isArray(slug) ? slug : []
  let props = {}

  try {
    props = await getBlogPage(websiteUrl.join('/'))
  } catch (e) {
    console.error(e)
  }

  return {
    props,
    revalidate: 3600,
  }
}

export default metaSetter(
  { Blogs },
  {
    gql: false,
    intercom: false,
  }
)

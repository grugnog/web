/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import type { BlogPageProps } from '@app/types'
import type { GetStaticProps } from 'next'
import React from 'react'
import { metaSetter } from '@app/utils'
import { getBlogPage } from '@app/lib'
import { WordPressPage } from '@app/components/blog'

function Blogs(props: BlogPageProps) {
  return <WordPressPage {...props} />
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
    revalidate: 60 * 12 * 2,
  }
}

export default metaSetter(
  { Blogs },
  {
    gql: false,
    intercom: false,
  }
)

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

function Blog(props: BlogPageProps) {
  return <WordPressPage {...props} />
}

export const getStaticProps: GetStaticProps = async () => {
  let props = {}

  try {
    props = await getBlogPage('')
  } catch (e) {
    console.error(e)
  }

  return {
    props,
    revalidate: 60 * 60,
  }
}
export default metaSetter(
  { Blog },
  {
    gql: false,
    intercom: false,
  }
)

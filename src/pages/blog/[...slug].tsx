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
import { Footer } from '@app/components/general'
import { NavBar } from '@app/components/blog'

function Blogs({ website, websiteUrl, title, links }: PageProps) {
  return (
    <Fragment>
      <Head>
        {title ? (
          <title key='title'>{title}</title>
        ) : (
          <title key='title'>{`Web Accessibility Blog - ${websiteUrl} | A11yWatch`}</title>
        )}
        <meta
          property='description'
          content={`A blog page for a11ywatch. The blog follows ADA and WCAG specifications.`}
          key='description'
        />
        {links?.map((link, linkIndex) => (
          <link key={linkIndex} {...link} />
        ))}
      </Head>
      <NavBar title={'The A11yWatch Blog'} />
      <div dangerouslySetInnerHTML={{ __html: website }} />
      <Footer />
    </Fragment>
  )
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params ?? {}
  const websiteUrl = Array.isArray(slug) ? slug : []
  let website: string | undefined = ''
  let title = ''
  let links: any[] = []

  try {
    const {
      html: pageHtml,
      title: pageTitle,
      links: pageLinks,
    } = await getBlogPage(websiteUrl.join('/'))

    website = pageHtml
    title = pageTitle
    links = pageLinks
  } catch (e) {
    console.error(e)
  }

  return {
    props: { website, websiteUrl, title, links },
    revalidate: 60 * 12 * 2,
  }
}

export default metaSetter(
  { Blogs },
  {
    gql: false,
  }
)

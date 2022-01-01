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

function Blogs({
  website,
  websiteUrl,
  title,
  links,
  stylesheets,
  metas,
}: PageProps) {
  return (
    <Fragment>
      <Head>
        {title ? (
          <title key='title'>{title}</title>
        ) : (
          <title key='title'>{`Web Accessibility Blog - ${websiteUrl} | A11yWatch`}</title>
        )}
        {links?.map((node, index) => (
          <link key={index} {...node} />
        ))}
        {stylesheets?.map((node, index) => {
          const childNode = node.children
          const styleProps = {
            ...node,
          }
          delete styleProps.children

          return (
            <style
              key={index}
              dangerouslySetInnerHTML={{ __html: childNode }}
              {...styleProps}
            />
          )
        })}
        {metas?.map((node, index) => {
          return (
            <Fragment key={`${node?.name}-${index}`}>
              <meta key={node?.name} {...node} />
            </Fragment>
          )
        })}
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

  let page

  try {
    page = await getBlogPage(websiteUrl.join('/'))
  } catch (e) {
    console.error(e)
  }
  const { html: website, title, links, stylesheets, metas } = page ?? {}

  return {
    props: { website, websiteUrl, title, links, stylesheets, metas },
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

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import type { BlogPageProps } from '@app/types'
import React, { Fragment } from 'react'
import Head from 'next/head'
import { Footer } from '@app/components/general'
import { NavBar } from '@app/components/blog'
import Script from 'next/script'

const getProps = (props: any) => {
  return {
    ...props,
    dangerouslySetInnerHTML: props.children
      ? {
          __html: props.children,
        }
      : undefined,
    children: undefined,
  }
}
export function WordPressPage({
  html,
  websiteUrl,
  title,
  links,
  stylesheets,
  metas,
  headScripts,
  bodyScripts,
}: BlogPageProps) {
  return (
    <Fragment>
      <Head>
        <title key='title'>{title || `Blog - ${websiteUrl}`}</title>
        {links?.map((node, index) => (
          <Fragment key={`${node?.id}-${index}`}>
            <link {...node} />
          </Fragment>
        ))}
        {metas?.map((node, index) => {
          return (
            <Fragment key={`${node?.name}-${index}`}>
              <meta key={node?.name} {...node} />
            </Fragment>
          )
        })}
        {stylesheets?.map((node, index) => {
          const styleProps = getProps(node)

          return (
            <Fragment key={`${node?.id}-${index}`}>
              <style {...styleProps} />
            </Fragment>
          )
        })}
        {headScripts?.map((node, index) => {
          const scriptProps = getProps(node)

          return (
            <Fragment key={`${node?.id}-${index}`}>
              <script {...scriptProps} key={node?.id} />
            </Fragment>
          )
        })}
      </Head>
      <NavBar title={'The A11yWatch Blog'} />
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className='light-background'
      />
      <Footer />
      {bodyScripts?.map((node, index) => {
        const scriptProps = getProps(node)

        return (
          <Fragment key={`${node?.id}-${index}`}>
            <Script {...scriptProps} />
          </Fragment>
        )
      })}
    </Fragment>
  )
}

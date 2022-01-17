/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import type { BlogPageProps } from '@app/types'
import React, { Fragment, useMemo } from 'react'
import Head from 'next/head'
import { Footer } from '@app/components/general'
import { NavBar } from '@app/components/blog'
import { companyName } from '@app/configs'
import NextScript from 'next/script'

const getProps = (props: any = {}) => {
  const mainProps = Object.assign({}, props, {
    dangerouslySetInnerHTML: props?.children
      ? {
          __html: props?.children,
        }
      : undefined,
    children: undefined,
  })

  if (!mainProps?.dangerouslySetInnerHTML?.__html) {
    delete mainProps.dangerouslySetInnerHTML
  }
  delete mainProps.children

  return mainProps
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
  const memoHeadScripts = useMemo(
    () =>
      headScripts?.map((node, index) => {
        const scriptProps = getProps(node)
        const scriptID = scriptProps?.id ?? `head-script-${index}`

        return (
          <Fragment key={scriptID}>
            <script {...scriptProps} key={scriptID} async />
          </Fragment>
        )
      }),
    [headScripts]
  )
  const memoBodyScripts = useMemo(
    () =>
      bodyScripts?.map((node, index) => {
        const bodyScriptProps = getProps(node)
        const keyID = bodyScriptProps?.id ?? `body-script-${index}`

        return (
          <Fragment key={bodyScriptProps?.id ?? `body-script-${index}`}>
            <NextScript {...bodyScriptProps} id={keyID} />
          </Fragment>
        )
      }),
    [bodyScripts]
  )
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
        {memoHeadScripts}
      </Head>
      <NavBar title={`The ${companyName} Blog`} />
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className='light-background'
      />
      <Footer />
      {memoBodyScripts}
    </Fragment>
  )
}

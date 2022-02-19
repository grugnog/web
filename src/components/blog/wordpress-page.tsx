/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import type { BlogPageProps } from '@app/types'
import React, { FC, Fragment, useMemo, memo } from 'react'
import Head from 'next/head'
import NextScript from 'next/script'
import { Footer } from '@app/components/general/footer'
import { NavBar } from '@app/components/blog/navbar'
import { companyName } from '@app/configs/app-config'

const getProps = (props: any = {}) => {
  const { children, ...mainProps } = props?.children
    ? Object.assign({}, props, {
        dangerouslySetInnerHTML: {
          __html: props.children,
        },
      })
    : props

  return mainProps
}

const Page: FC<BlogPageProps> = ({
  html,
  websiteUrl,
  title,
  links,
  stylesheets,
  metas,
  headScripts,
  bodyScripts,
}) => {
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
        const keyID = (node && node?.id) || `body-script-${index}`
        const scriptProps = getProps(node)

        return (
          <Fragment key={keyID}>
            <NextScript id={keyID} {...scriptProps} />
          </Fragment>
        )
      }),
    [bodyScripts]
  )
  return (
    <>
      <Head>
        <title key='title'>{title || `Blog - ${websiteUrl}`}</title>
        {links?.map((node, index) => (
          <Fragment key={`${node?.id}-${index}`}>
            <link {...node} />
          </Fragment>
        ))}
        {metas?.map((node, index) => {
          const nodeName = node && node?.name

          return (
            <Fragment key={`${nodeName}-${index}`}>
              <meta key={nodeName} {...node} />
            </Fragment>
          )
        })}
        {stylesheets?.map((node, index) => {
          const styleProps = getProps(node)

          return (
            <Fragment key={`${node && node?.id}-${index}`}>
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
    </>
  )
}

export const WordPressPage = memo(Page)

import type { BlogPageProps } from '@app/types'
import React, { FC, Fragment, useMemo, memo } from 'react'
import Head from 'next/head'
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

        return <script {...scriptProps} key={scriptID} async />
      }),
    [headScripts]
  )
  const memoBodyScripts = useMemo(
    () =>
      bodyScripts?.length
        ? bodyScripts.map((node, index) => {
            const keyID = node?.id || `body-script-${index}`
            const scriptProps = getProps(node)

            if (!node) {
              return null
            }

            return <script key={keyID} {...scriptProps} />
          })
        : [],
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

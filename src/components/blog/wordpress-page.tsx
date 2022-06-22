import type { BlogPageProps } from '@app/types/page'
import React, { FC, Fragment, useMemo, memo } from 'react'
import Head from 'next/head'
import { Footer } from '@app/components/general/footer'
import { NavBar } from '@app/components/blog/navbar'
import { companyName } from '@app/configs/app-config'
import parser from 'html-react-parser'

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
  children,
  footer = true,
  header = true,
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
        <title key='title'>
          {title || `Blog${websiteUrl ? ` - ${websiteUrl}` : ''}`}
        </title>
        <link rel='alternate' hrefLang='en' />
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
      {header ? <NavBar title={`The ${companyName} Blog`} /> : null}

      {children}
      <main className='light-background'>
        <>{html ? parser(html) : ''}</>
      </main>

      {footer ? <Footer blog /> : null}
      {memoBodyScripts}
    </>
  )
}

export const WordPressPage = memo(Page)

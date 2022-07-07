import React, { Fragment, memo } from 'react'
import Head from 'next/head'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { strings } from '@app-strings'
import { theme } from '@app-theme'
import { DOMAIN_NAME, INTERCOM_ENABLED } from '@app/configs'
import { ErrorBoundary, SkipContent } from '@app/components/general'
import type { InnerApp } from '@app/types/page'
import { SnackBar } from './snack-bar'
import Script from 'next/script'
import { BLOG_WEBFLOW_URL } from '@app/configs/app-config'

const CRISP_WEBSITE_ID = process.env.CRISP_WEBSITE_ID

// load the application with providers depending on component
const Application = ({ Component, pageProps, name }: InnerApp) => {
  return <Component {...pageProps} name={name} />
}

export function MyAppWrapper({ Component, pageProps }: InnerApp) {
  const { description, title, name } = Component?.meta || strings?.meta
  const pathName = String(name).toLowerCase()
  const metaTitle = title || `Web Accessibility Service | ${strings.appName}`
  const domainName = pathName === 'blog' ? BLOG_WEBFLOW_URL : DOMAIN_NAME

  return (
    <Fragment>
      <Head>
        <meta charSet='utf-8' key={'charset'} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title key='title'>{metaTitle}</title>
        <meta property='og:title' content={metaTitle} key='og:title' />
        <meta property='og:type' key='og:type' content='website' />
        <meta
          property='og:url'
          content={`${domainName}${
            ['index', 'blog'].includes(pathName)
              ? ''
              : `/${pathName.replace(/ /g, '-')}`
          }`}
          key={'og:url'}
        />
        {description ? (
          <>
            <meta name='description' content={description} key='description' />
            <meta
              property='og:description'
              content={description}
              key={'og:description'}
            />
          </>
        ) : null}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SkipContent />
        <ErrorBoundary>
          <Application
            Component={Component}
            pageProps={pageProps}
            name={name}
          />
        </ErrorBoundary>
        <SnackBar />
      </ThemeProvider>
      {Component.intercom && CRISP_WEBSITE_ID && !INTERCOM_ENABLED ? (
        <Script id='crips_id'>{`window.$crisp=[];window.CRISP_WEBSITE_ID="${CRISP_WEBSITE_ID}";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`}</Script>
      ) : null}
    </Fragment>
  )
}

export const MyApp = memo(MyAppWrapper)

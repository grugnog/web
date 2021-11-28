/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import '@app/stylesheets/main.css'
import '@a11ywatch/ui/css/tailwind.css'
import '@app/stylesheets/tailwind.css'

import React, { useEffect, Fragment } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { strings } from '@app-strings'
import { theme } from '@app-theme'
import { twitterSite } from '@app-config'
import { WithSnackBar, WithSkipContent } from '@app/components/adhoc'
import { initAppModel } from '@app/data'
import { DOMAIN_NAME, LOGGIN_ROUTES } from '@app/configs'
import { startIntercom } from '@app/utils'
import { withApollo } from '@app/apollo'
import { WebsiteProviderWrapper } from '@app/components/providers'
import { ErrorBoundary } from '@app/components/general'

interface MergedApp extends AppProps {
  Component: AppProps['Component'] & {
    meta: any
  }
}

const authRoutes = LOGGIN_ROUTES.map((route) => route.replace('/', ''))

function MyApp({ Component, pageProps }: MergedApp) {
  useEffect(() => {
    initAppModel()
    startIntercom()
  }, [])

  const meta = Component?.meta || strings?.meta
  const { description, title, name } = meta

  const websiteQuery = authRoutes.includes(name && String(name).toLowerCase())

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
        />
        <meta name='description' content={description} />
        <meta name='theme-color' content={theme.palette.primary.main} />
        <meta name='mobile-web-app-capable' content='yes' />
        <link rel='manifest' href='./static/manifest.json' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content={twitterSite} />
        <meta
          property='twitter:image'
          content={`${DOMAIN_NAME}/static/img/intro-poster.png`}
        />
        <meta
          property='og:title'
          content={`Web Accessibility | ${strings.appName}`}
        />
        <meta property='og:url' content={DOMAIN_NAME} />
        <meta
          property='og:image'
          content={`${DOMAIN_NAME}/static/img/intro-poster.png`}
        />
        <meta property='og:description' content={description} />
        <link rel='apple-touch-icon' href='./static/img/favicon-small.png' />
        <link rel='icon' type='image/x-icon' href='./static/img/favicon.png' />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WithSkipContent />
        <ErrorBoundary>
          <WebsiteProviderWrapper websiteQuery={!websiteQuery}>
            <Component {...pageProps} name={name} />
          </WebsiteProviderWrapper>
        </ErrorBoundary>
        <WithSnackBar />
      </ThemeProvider>
    </Fragment>
  )
}

export default withApollo(MyApp)

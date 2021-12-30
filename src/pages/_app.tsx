/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import '@app/stylesheets/main.css'
import '@a11ywatch/ui/css/tailwind.css'
import '@app/stylesheets/tailwind.css'
import React, { useEffect, Fragment, memo } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { strings } from '@app-strings'
import { theme } from '@app-theme'
import { twitterSite } from '@app-config'
import { WithSnackBar } from '@app/components/adhoc'
import { initAppModel } from '@app/data'
import { DOMAIN_NAME, GQL_ROUTES, LOGGIN_ROUTES } from '@app/configs'
import { startIntercom } from '@app/utils'
import { WebsiteProviderWrapper } from '@app/components/providers'
import { ErrorBoundary, SkipContent } from '@app/components/general'

type AppComponent = AppProps['Component'] & {
  meta: any
}

interface MergedApp extends AppProps {
  Component: AppComponent
}

const authRoutes = LOGGIN_ROUTES.map((route) => route.replace('/', ''))
const gqlRoutes = GQL_ROUTES.map((route) =>
  route.replaceAll('/', '').replaceAll('-', ' ')
)

const App = ({
  Component,
  pageProps,
  name,
}: {
  Component: AppComponent
  name: string
  pageProps?: any
}) => {
  const nameLowerCased = (name && String(name).toLowerCase()) || ''
  const gqlQuery = gqlRoutes.includes(nameLowerCased)

  if (gqlQuery) {
    const websiteQuery = authRoutes.includes(nameLowerCased)
    return (
      <WebsiteProviderWrapper websiteQuery={!websiteQuery}>
        <Component {...pageProps} name={name} />
      </WebsiteProviderWrapper>
    )
  }

  return <Component {...pageProps} name={name} />
}

const MemoApp = memo(App)

function MyApp({ Component, pageProps }: MergedApp) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')

    if (jssStyles?.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }

    initAppModel()
    startIntercom()
  }, [])

  const meta = Component?.meta || strings?.meta
  const { description, title, name } = meta

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} key='description' />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
        />
        <meta name='theme-color' content={theme.palette.primary.main} />
        <meta name='mobile-web-app-capable' content='yes' />
        <link rel='manifest' href='/static/manifest.json' />
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
        <link rel='apple-touch-icon' href='/static/img/favicon-small.png' />
        <link rel='icon' type='image/x-icon' href='/static/img/favicon.png' />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SkipContent />
        <ErrorBoundary>
          <MemoApp Component={Component} pageProps={pageProps} name={name} />
        </ErrorBoundary>
        <WithSnackBar />
      </ThemeProvider>
    </Fragment>
  )
}

export default MyApp

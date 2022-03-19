import React, { useEffect, Fragment, memo } from 'react'
import Head from 'next/head'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { strings } from '@app-strings'
import { theme } from '@app-theme'
import { WithSnackBar } from '@app/components/adhoc'
import { initAppModel, userModel } from '@app/data'
import { twitterSite, DOMAIN_NAME, LOGGIN_ROUTES } from '@app/configs'
import { ping, startIntercom } from '@app/utils'
import { WebsiteProviderWrapper } from '@app/components/providers'
import { ErrorBoundary, SkipContent } from '@app/components/general'
import type { InnerApp } from '@app/types/page'

const authRoutes = LOGGIN_ROUTES.map((route) => route.replace('/', ''))

const Application = ({ Component, pageProps, name }: InnerApp) => {
  const nameLowerCased = (name && String(name).toLowerCase()) || ''

  if (Component.gql) {
    // TODO: USE META TO DETERMINE PROVIDER PULLING
    const initialQuery =
      authRoutes.includes(nameLowerCased) ||
      authRoutes.includes(nameLowerCased.replace(/ /g, '-'))

    return (
      <WebsiteProviderWrapper
        skip={!initialQuery}
        gqlFilter={Component?.params?.filter}
      >
        <Component {...pageProps} name={name} />
      </WebsiteProviderWrapper>
    )
  }

  return <Component {...pageProps} name={name} />
}

const MemoApp = memo(Application)

export function MyApp({ Component, pageProps }: InnerApp) {
  const { description, title, name } = Component?.meta || strings?.meta

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')

    if (jssStyles?.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }

    initAppModel()
    userModel.initModel({
      cookie:
        typeof navigator !== 'undefined' &&
        typeof document !== 'undefined' &&
        navigator.cookieEnabled &&
        document.cookie,
    })

    // TODO: look into middleware initial request handler
    queueMicrotask(ping)
  }, [])

  useEffect(() => {
    if (Component.intercom) {
      startIntercom()
    }
  }, [Component.intercom])

  return (
    <Fragment>
      <Head>
        <title key='title'>{title}</title>
        <meta name='description' content={description} key='description' />
        {process.env.NEXT_PUBLIC_DISABLE_SEO === '1' ? (
          <meta name='robots' content='noindex' />
        ) : null}
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
        />
        <meta name='theme-color' content={theme.palette.primary.main} />
        <meta name='mobile-web-app-capable' content='yes' />
        <link rel='manifest' href='/manifest.json' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content={twitterSite} />
        <meta
          property='twitter:image'
          content={`${DOMAIN_NAME}/img/intro-poster.png`}
        />
        <meta
          property='og:title'
          content={`Web Accessibility Service | ${strings.appName}`}
        />
        <meta property='og:url' content={DOMAIN_NAME} />
        <meta
          property='og:image'
          content={`${DOMAIN_NAME}/img/intro-poster.png`}
        />
        <meta property='og:description' content={description} />
        <link rel='apple-touch-icon' href='/img/apple-touch-icon.png' />
        <link rel='icon' type='image/x-icon' href='/img/favicon.ico' />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {Component.intercom === false ? null : <SkipContent />}
        <ErrorBoundary>
          <MemoApp Component={Component} pageProps={pageProps} name={name} />
        </ErrorBoundary>
        <WithSnackBar />
      </ThemeProvider>
    </Fragment>
  )
}

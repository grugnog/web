import React, { useEffect, Fragment, memo } from 'react'
import Head from 'next/head'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { strings } from '@app-strings'
import { theme } from '@app-theme'
import { WithSnackBar } from '@app/components/adhoc'
import { initAppModel, userModel } from '@app/data'
import { LOGGIN_ROUTES } from '@app/configs'
import { ping, startIntercom } from '@app/utils'
import { WebsiteProviderWrapper } from '@app/components/providers'
import { RestWebsiteProviderWrapper } from '../providers/rest/rest-website'
import { ErrorBoundary, SkipContent } from '@app/components/general'
import type { InnerApp } from '@app/types/page'

const authRoutes = LOGGIN_ROUTES.map((route) => route.replace('/', ''))

const Application = ({ Component, pageProps, name }: InnerApp) => {
  // name is based off function name and not file name
  const nameLowerCased = (name && String(name).toLowerCase()) || ''

  const initialWebsiteQuery =
    authRoutes.includes(nameLowerCased) ||
    authRoutes.includes(nameLowerCased.replace(/ /g, '-'))

  // TODO: USE META TO DETERMINE PROVIDER PULLING
  let initialQuery = initialWebsiteQuery
  let scopedQuery = ''

  // run query without pages. [Urgent and issues]
  if (nameLowerCased === 'urgent' || nameLowerCased === 'issues') {
    initialQuery = false
    scopedQuery = 'issues'
  }

  if (Component.rest) {
    return (
      <RestWebsiteProviderWrapper>
        <Component {...pageProps} name={name} />
      </RestWebsiteProviderWrapper>
    )
  }

  if (Component.gql) {
    return (
      <WebsiteProviderWrapper
        skip={!initialQuery}
        gqlFilter={Component?.params?.filter}
        scopedQuery={scopedQuery}
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
        <meta property='og:description' content={description} />
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

import React, { useEffect, Fragment, FC } from 'react'
import Head from 'next/head'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { strings } from '@app-strings'
import { theme } from '@app-theme'
import { initAppModel, userModel } from '@app/data'
import { DOMAIN_NAME, INTERCOM_ENABLED, LOGGIN_ROUTES } from '@app/configs'
import { ping, startIntercom } from '@app/utils'
import {
  WASMContextProvider,
  WebsiteProviderWrapper,
} from '@app/components/providers'
import { RestWebsiteProviderWrapper } from '../providers/rest/rest-website'
import { ErrorBoundary, SkipContent } from '@app/components/general'
import type { InnerApp } from '@app/types/page'
import { SnackBar } from './snack-bar'
import Script from 'next/script'
import { buildScopeQuery } from '@app/utils/build-scope'
import { BLOG_WEBFLOW_URL } from '@app/configs/app-config'

const authRoutes = LOGGIN_ROUTES.map((route) => route.replace('/', ''))

const CRISP_WEBSITE_ID = process.env.CRISP_WEBSITE_ID

// load the application with providers depending on component
const Application = ({ Component, pageProps, name }: InnerApp) => {
  // name is based off function name and not file name
  const nameLowerCased = (name && String(name).toLowerCase()) || ''

  const initialWebsiteQuery =
    authRoutes.includes(nameLowerCased) ||
    authRoutes.includes(nameLowerCased.replace(/ /g, '-'))

  // TODO: USE META TO DETERMINE PROVIDER PULLING
  const { initialQuery, scopedQuery } = buildScopeQuery(
    nameLowerCased,
    initialWebsiteQuery
  )

  // Restful provider for API [Good for marketing sections]
  const RestWrapper = Component.rest ? RestWebsiteProviderWrapper : Fragment

  // gQL provider for API
  const GqlWrapper: FC = Component.gql
    ? ({ children }) => {
        return (
          <WebsiteProviderWrapper
            skip={!initialQuery}
            gqlFilter={Component?.params?.filter}
            scopedQuery={scopedQuery}
          >
            {children}
          </WebsiteProviderWrapper>
        )
      }
    : Fragment

  // gQL provider for API
  const WasmWrapper: FC = Component.wasm
    ? ({ children }) => {
        return <WASMContextProvider>{children}</WASMContextProvider>
      }
    : Fragment

  return (
    <WasmWrapper>
      <GqlWrapper>
        <RestWrapper>
          <Component {...pageProps} name={name} />
        </RestWrapper>
      </GqlWrapper>
    </WasmWrapper>
  )
}

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
    if (Component.intercom && INTERCOM_ENABLED) {
      startIntercom()
    }
  }, [Component.intercom])

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

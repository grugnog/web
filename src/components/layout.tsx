import React, { Fragment, FC, useEffect } from 'react'

import { LOGGIN_ROUTES } from '@app/configs'
import {
  WASMContextProvider,
  WebsiteProviderWrapper,
} from '@app/components/providers'
import { RestWebsiteProviderWrapper } from '@app/components/providers/rest/rest-website'
import type { InnerApp } from '@app/types/page'
import { buildScopeQuery } from '@app/utils/build-scope'
import { strings } from '@app/content/strings/a11y'
import { initAppModel, userModel } from '@app/data'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '@app-theme'
import { CssBaseline } from '@material-ui/core'
import Script from 'next/script'
import {
  BLOG_WEBFLOW_URL,
  DOMAIN_NAME,
  twitterSite,
} from '@app/configs/app-config'
import Head from 'next/head'
import { useStaticRendering as enableMobxStaticRendering } from 'mobx-react-lite'
import { SkipContent, SnackBar } from './general'

if (typeof window === 'undefined') {
  enableMobxStaticRendering(true)
}

const authRoutes = LOGGIN_ROUTES.map((route) => route.replace('/', ''))
const CRISP_WEBSITE_ID = process.env.CRISP_WEBSITE_ID

// load the application with providers depending on component
const LayoutWrapper = ({ Component, pageProps }: InnerApp) => {
  const { name } = Component?.meta || strings?.meta
  const { wasm, gql } = Component

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
  }, [])

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

  // Restful/OpenAPI provider
  const RestWrapper = Component.rest ? RestWebsiteProviderWrapper : Fragment

  // gQL provider
  const GqlWrapper: FC = gql
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

  return (
    <WASMContextProvider load={wasm}>
      <GqlWrapper>
        <RestWrapper>
          <Component {...pageProps} name={name} />
        </RestWrapper>
      </GqlWrapper>
    </WASMContextProvider>
  )
}

export default function Layout({ children, ...props }: any) {
  const Component = props?.Component
  const { intercom } = Component ?? {}
  const { description, title, name } = Component?.meta || strings?.meta
  const pathName = String(name).toLowerCase()
  const metaTitle = title || `Web Accessibility Service | ${strings.appName}`
  const domainName = pathName === 'blog' ? BLOG_WEBFLOW_URL : DOMAIN_NAME

  return (
    <>
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

        {process.env.NEXT_PUBLIC_DISABLE_SEO === '1' ? (
          <meta name='robots' content='noindex' />
        ) : null}
        <meta
          name='theme-color'
          content={theme.palette.primary.main}
          key={'theme-color'}
        />
        <meta name='mobile-web-app-capable' content='yes' />
        <link rel='manifest' href='/manifest.json' key={'manifest'} />
        <meta
          name='format-detection'
          content='telephone=no'
          key={'format-detection'}
        />
        <meta
          name='apple-mobile-web-app-capable'
          content='yes'
          key={'apple-mobile-web-app-capable'}
        />
        <meta
          name='twitter:card'
          content='summary_large_image'
          key={'twitter:card'}
        />
        <meta name='twitter:site' content={twitterSite} key={'twitter:site'} />
        <meta
          property='twitter:image'
          content={`${DOMAIN_NAME}/img/intro-poster.png`}
        />
        <meta
          property='og:image'
          key={'og:image'}
          content={`${DOMAIN_NAME}/img/intro-poster.png`}
        />
        <link
          rel='apple-touch-icon'
          href='/img/apple-touch-icon.png'
          key={'apple-touch-icon'}
        />
        <link
          rel='icon'
          type='image/x-icon'
          href='/img/favicon.ico'
          key={'image/x-icon'}
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SkipContent />
        <LayoutWrapper {...props}>{children}</LayoutWrapper>
        <SnackBar />
      </ThemeProvider>
      {intercom && CRISP_WEBSITE_ID ? (
        <Script id='crips_id'>{`window.$crisp=[];window.CRISP_WEBSITE_ID="${CRISP_WEBSITE_ID}";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`}</Script>
      ) : null}
    </>
  )
}

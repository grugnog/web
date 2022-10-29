import { useEffect } from 'react'
import Head from 'next/head'

import { LOGGIN_ROUTES } from '@app/configs'
import {
  AuthProviderWrapper,
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
import {
  BLOG_WEBFLOW_URL,
  companyName,
  DOMAIN_NAME,
  twitterSite,
} from '@app/configs/app-config'
import { useStaticRendering as enableMobxStaticRendering } from 'mobx-react-lite'
import { SkipContent, SnackBar } from './general'
import { ping } from '@app/utils'

if (typeof window === 'undefined') {
  enableMobxStaticRendering(true)
}

const authRoutes = LOGGIN_ROUTES.map((route) => route.replace('/', ''))

// load the application with providers depending on component
const LayoutWrapper = ({ Component, pageProps }: InnerApp) => {
  const { name } = Component?.meta || strings?.meta
  const { wasm, gql, rest } = Component

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')

    if (jssStyles?.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }

    initAppModel()

    const authed = userModel.initModel({
      cookie:
        typeof navigator !== 'undefined' &&
        typeof document !== 'undefined' &&
        navigator.cookieEnabled &&
        document.cookie,
    })

    authed && queueMicrotask(ping)
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

  return (
    <WASMContextProvider load={wasm}>
      <AuthProviderWrapper load={wasm || gql || rest}>
        <WebsiteProviderWrapper
          skip={!initialQuery}
          gqlFilter={Component?.params?.filter}
          scopedQuery={scopedQuery}
          gql={gql}
        >
          <RestWebsiteProviderWrapper rest={rest}>
            <Component {...pageProps} name={name} />
          </RestWebsiteProviderWrapper>
        </WebsiteProviderWrapper>
      </AuthProviderWrapper>
    </WASMContextProvider>
  )
}

export default function Layout({ children, ...props }: any) {
  const Component = props?.Component
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
        {description ? (
          <meta name='description' content={description} key='description' />
        ) : null}
        <meta
          name='twitter:card'
          content='summary_large_image'
          key={'twitter:card'}
        />
        <meta name='twitter:site' content={twitterSite} key={'twitter:site'} />
        <meta
          name='twitter:creator'
          content={twitterSite}
          key={'twitter:creator'}
        />
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
          <meta
            property='og:description'
            content={description}
            key={'og:description'}
          />
        ) : null}
        {metaTitle ? (
          <meta property='og:title' content={metaTitle} key={'og:title'} />
        ) : null}
        <meta
          property='og:image'
          content={`${DOMAIN_NAME}/api/og?title=${metaTitle}`}
        />
        <meta property='og:image:width' content='1200' key={'og:image:width'} />
        <meta
          property='og:image:height'
          content='728'
          key={'og:image:height'}
        />

        {description ? (
          <meta
            property='og:image:alt'
            content={description}
            key='og:image:alt'
          />
        ) : null}
        <meta property='og:site_name' content={companyName} />

        <meta property='author' content='Jeff Mendez' key='author' />
        <meta
          property='keywords'
          key='keywords'
          content='Web Accessibility Tool, Web Accessibility API, OSS Web Accessibility, Inclusion, A11y, Web'
        />
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
    </>
  )
}

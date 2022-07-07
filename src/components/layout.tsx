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

const authRoutes = LOGGIN_ROUTES.map((route) => route.replace('/', ''))

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
  return <LayoutWrapper {...props}>{children}</LayoutWrapper>
}

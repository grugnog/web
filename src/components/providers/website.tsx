import React, { createContext, useContext, FC } from 'react'
import { useWebsiteData } from '@app/data'
import { sharedWebsiteDefaults } from './defaults'
import { withApollo } from '@app/apollo'

const AppContext = createContext(sharedWebsiteDefaults)

export const WebsiteProvider = AppContext.Provider

// skip fetching the website query
export const WebsiteProviderComponent: FC<{
  skip?: boolean
  gqlFilter?: any
}> = ({ children, skip, gqlFilter = '' }) => {
  const sharedState = useWebsiteData(gqlFilter, '', null, skip)

  return <WebsiteProvider value={sharedState}>{children}</WebsiteProvider>
}

export const WebsiteProviderWrapper = withApollo(WebsiteProviderComponent)

export function withWebsite(PageComponent: any) {
  const WithWebsite = ({ ...pageProps }: any) => {
    return (
      <WebsiteProviderWrapper>
        <PageComponent {...pageProps} />
      </WebsiteProviderWrapper>
    )
  }

  return WithWebsite
}

export function useWebsiteContext() {
  return useContext(AppContext)
}

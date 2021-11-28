import React, { createContext, useContext, FC } from 'react'
import { useWebsiteData } from '@app/data'
import { sharedWebsiteDefaults } from './defaults'

const AppContext = createContext(sharedWebsiteDefaults)

export const WebsiteProvider = AppContext.Provider

export const WebsiteProviderWrapper: FC<{ websiteQuery?: boolean }> = ({
  children,
  websiteQuery,
}) => {
  const data = useWebsiteData('', '', null, websiteQuery)

  const sharedState = {
    ...data,
    error: data?.error as any,
  }

  return <WebsiteProvider value={sharedState}>{children}</WebsiteProvider>
}

export function withWebsite(PageComponent: any) {
  const WithWebsite = ({ apolloClient, apolloState, ...pageProps }: any) => {
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

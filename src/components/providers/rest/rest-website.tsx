import React, { createContext, useContext, FC } from 'react'
import { useRestWebsiteData } from '@app/data'
import { sharedWebsiteDefaults } from '../defaults'

const {
  subscriptionData,
  error,
  addWebsite,
  removeWebsite,
  updateWebsite,
  mutatationLoading,
  refetch,
  crawlWebsite,
  ...strip
} = sharedWebsiteDefaults

const AppContext = createContext(strip)

export const RestWebsiteProvider = AppContext.Provider

// skip fetching the website query
export const RestWebsiteProviderWrapper: FC = ({ children }) => {
  const sharedState = useRestWebsiteData()

  return (
    <RestWebsiteProvider value={sharedState}>{children}</RestWebsiteProvider>
  )
}

// TODO:
export function withRestWebsite(PageComponent: any) {
  const WithRestWebsite = ({ ...pageProps }: any) => {
    return (
      <RestWebsiteProviderWrapper>
        <PageComponent {...pageProps} />
      </RestWebsiteProviderWrapper>
    )
  }

  return WithRestWebsite
}

export function useRestWebsiteContext() {
  return useContext(AppContext)
}

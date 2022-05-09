import React, { createContext, useContext, FC } from 'react'
import { useSearchRest } from '@app/data'
import { restWebsiteDefaults } from '../defaults'

const AppContext = createContext(restWebsiteDefaults)

export const RestWebsiteProvider = AppContext.Provider

export const RestWebsiteProviderWrapper: FC = ({ children }) => {
  const sharedState = useSearchRest()

  return (
    <RestWebsiteProvider value={sharedState}>{children}</RestWebsiteProvider>
  )
}

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

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
  scopedQuery?: string
}> = ({ children, skip, gqlFilter = '', scopedQuery }) => {
  // main top data state
  const state = useWebsiteData(gqlFilter, '', null, skip, scopedQuery)

  return <WebsiteProvider value={state}>{children}</WebsiteProvider>
}

export const WebsiteProviderWrapper = withApollo(WebsiteProviderComponent)

export function useWebsiteContext() {
  return useContext(AppContext)
}

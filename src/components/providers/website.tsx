import { Fragment, createContext, useContext, FC, memo } from 'react'
import { useWebsiteData } from '@app/data'
import { sharedWebsiteDefaults } from './defaults'
import { withApollo } from '@app/apollo'

const AppContext = createContext(sharedWebsiteDefaults)

export const WebsiteProvider = AppContext.Provider

interface GqlProps {
  skip?: boolean
  gqlFilter?: any
  scopedQuery?: string
  gql?: boolean
}

// skip fetching the website query
export const WebsiteProviderComponent: FC<GqlProps> = ({
  children,
  skip,
  gqlFilter = '',
  scopedQuery,
}) => {
  const state = useWebsiteData(gqlFilter, '', null, skip, scopedQuery)

  return <WebsiteProvider value={state}>{children}</WebsiteProvider>
}

export const WebsiteProviderGql = withApollo(WebsiteProviderComponent)

const WebsiteProviderContextWrapper: FC<GqlProps> = ({
  children,
  gql,
  ...extra
}) => {
  if (!gql) {
    return <Fragment>{children}</Fragment>
  }
  return <WebsiteProviderGql {...extra}>{children}</WebsiteProviderGql>
}

export const WebsiteProviderWrapper: FC<GqlProps> = memo(
  WebsiteProviderContextWrapper
)

export function useWebsiteContext() {
  return useContext(AppContext)
}

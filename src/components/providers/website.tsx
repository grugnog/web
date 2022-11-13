import {
  Fragment,
  PropsWithChildren,
  createContext,
  useContext,
  FC,
} from 'react'
import { useWebsiteData } from '@app/data'
import { sharedWebsiteDefaults } from './defaults'
import { withApollo } from '@app/apollo'

const AppContext = createContext(sharedWebsiteDefaults)

export const WebsiteProvider = AppContext.Provider

type GqlProps = PropsWithChildren<{
  skip?: boolean
  gqlFilter?: any
  scopedQuery?: string
  gql?: boolean
}>

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

export const WebsiteProviderWrapper: FC<GqlProps> = ({
  children,
  gql,
  ...extra
}) => {
  if (!gql) {
    return <Fragment>{children}</Fragment>
  }
  return <WebsiteProviderGql {...extra}>{children}</WebsiteProviderGql>
}

export function useWebsiteContext() {
  return useContext(AppContext)
}

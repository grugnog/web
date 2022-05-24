import type { IssueData } from '@app/types'
import { ApolloError } from 'apollo-client'

export const sharedWebsiteDefaults = {
  issueFeed: { data: [] as IssueData[], open: false },
  loading: false,
  mutatationLoading: false,
  data: [],
  error: undefined as ApolloError | undefined,
  subscriptionData: {
    issueSubData: null,
  },
  // issues only TODO: MOVE TO SEPERATE PROVIDER
  issueData: [],
  issueDataLoading: false,
  // visuals
  lighthouseVisible: true,
  refetch: (_: any): Promise<any> => {
    return _
  },
  addWebsite: (_: any): Promise<any> => {
    return _
  },
  removeWebsite: (_: any): Promise<any> => {
    return _
  },
  crawlWebsite: (_: any): Promise<any> => {
    return _
  },
  updateWebsite: (_: any): Promise<any> => {
    return _
  },
  setIssueFeedContent: (_: any, _open: boolean): void => {
    return _
  },
  scanWebsite: (_: any): Promise<any> => {
    return _
  },
  // TODO: move UI control on its own
  setLighthouseVisibility: (_: any): void => {
    return _
  },
  onLoadMoreWebsites: (_: any): Promise<any> => {
    return _
  },
}

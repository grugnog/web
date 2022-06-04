import { ApolloError } from 'apollo-client'

export const sharedWebsiteDefaults = {
  issueFeed: { data: {}, open: false },
  loading: false,
  mutatationLoading: false as boolean,
  data: [],
  error: undefined as ApolloError | undefined,
  subscriptionData: {
    issueSubData: null,
  },
  // issues only TODO: MOVE TO SEPERATE PROVIDER
  issueData: [],
  pagesData: [],
  analyticsData: [],
  scriptsData: [],
  scriptsDataLoading: false,
  pagesDataLoading: false,
  issueDataLoading: false,
  analyticsDataLoading: false,
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
  onLoadMoreIssues: (_: any): Promise<any> => {
    return _
  },
  onLoadMorePages: (_: any): Promise<any> => {
    return _
  },
}

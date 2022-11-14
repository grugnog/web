import { ApolloError } from 'apollo-client'

// default provider data for application.
export const sharedWebsiteDefaults = {
  feedOpen: false,
  loading: false,
  mutatationLoading: false as boolean,
  data: [],
  error: undefined as ApolloError | undefined,
  subscriptionData: {
    issueSubData: null,
  },
  activeCrawls: {},
  // issues only TODO: MOVE TO SEPERATE PROVIDER
  issueData: [],
  pagesData: [],
  analyticsData: [],
  scriptsData: [],
  actionsData: [],
  scriptsDataLoading: false,
  pagesDataLoading: false,
  issueDataLoading: false,
  actionsDataLoading: false,
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
  setIssueFeedContent: (_open: boolean): void => {
    return
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
  onLoadMoreAnalytics: (_: any): Promise<any> => {
    return _
  },
  onLoadMoreActions: (_: any): Promise<any> => {
    return _
  },
  onLoadMoreScripts: (_: any): Promise<any> => {
    return _
  },
}

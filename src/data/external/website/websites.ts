import { useState, useEffect, useCallback, useReducer, useMemo } from 'react'
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks'
import {
  ADD_WEBSITE,
  REMOVE_WEBSITE,
  UPDATE_WEBSITE,
  CRAWL_WEBSITE,
  SCAN_WEBSITE,
} from '@app/mutations'
import { GET_WEBSITES, GET_WEBSITES_INFO, updateCache } from '@app/queries'
import {
  ISSUE_SUBSCRIPTION,
  CRAWL_COMPLETE_SUBSCRIPTION,
} from '@app/subscriptions'
import { UserManager, AppManager } from '@app/managers'
import { useIssueFeed } from '../../local'
import type { OnSubscriptionDataOptions } from '@apollo/react-common'
import type { Website } from '@app/types'

/*
 * This hook returns all the queries, mutations, and subscriptions between your Website with the graphs,
 * Pages, and Issues with pagination.
 * @example const {data} = useWebsiteData(); // returns websites
 * @example const {data} = useWebsiteData('', 'www.somepage.com', null, false); bind to a website for mutations.
 *
 */
export const useWebsiteData = (
  filter: string = '',
  url: string = '',
  customHeaders: any = null,
  skip: boolean = false,
  scopedQuery: string = ''
) => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0) // top level force update state
  const [lighthouseVisible, setLighthouseVisibility] = useState<boolean>(true)
  const { issueFeed, setIssueFeedContent } = useIssueFeed()

  const subscriptionVars = { userId: UserManager.getID }
  const variables = {
    filter,
    customHeaders,
    url,
  }

  // start of main queries for pages. Root gets all
  const { data, loading, refetch, error, fetchMore } = useQuery(GET_WEBSITES, {
    variables: {
      ...variables,
      limit: 5,
      offset: 0,
    },
    skip: !!scopedQuery, // when scoped queries ignore the initial result
  })

  // Only get issues from websites
  const {
    data: issuesResults,
    loading: issueDataLoading,
    fetchMore: fetchMoreIssues,
  } = useQuery(GET_WEBSITES_INFO, {
    variables: {
      ...variables,
      limit: 5,
      offset: 0,
    },
    skip: scopedQuery !== 'issues',
  })

  // Get Website Pages
  const {
    data: pagesResults,
    loading: pagesDataLoading,
    fetchMore: fetchMorePages,
  } = useQuery(GET_WEBSITES_INFO, {
    variables: {
      ...variables,
      limit: 5,
      offset: 0,
    },
    skip: scopedQuery !== 'pages',
  })

  const [removeWebsite, { loading: removeLoading }] = useMutation(
    REMOVE_WEBSITE,
    updateCache
  )
  const [
    addWebsiteMutation,
    { data: addWebsiteData, loading: addLoading },
  ] = useMutation(ADD_WEBSITE, updateCache)
  const [updateWebsite, { data: updateData }] = useMutation(UPDATE_WEBSITE, {
    variables,
  })

  // trigger events to gather issues
  const [crawl, { loading: crawlLoading }] = useMutation(CRAWL_WEBSITE)
  const [scan, { loading: scanLoading }] = useMutation(SCAN_WEBSITE)

  // SCOPE WEBSITE DATA PER ROUTE (ALL, ISSUES, PAGES)
  const websites = useMemo(() => {
    return data?.user?.websites || []
  }, [data])

  const issueData = useMemo(() => {
    return issuesResults?.user?.websites || []
  }, [issuesResults])

  const pagesData = useMemo(() => {
    return pagesResults?.user?.websites || []
  }, [pagesResults])

  // website crawl finished
  const onCrawlCompleteSubscription = useCallback(
    async ({ subscriptionData }: OnSubscriptionDataOptions<any>) => {
      const completedWebsite = subscriptionData?.data?.crawlComplete
      if (completedWebsite) {
        const adaScoreAverage = completedWebsite.adaScoreAverage
        AppManager.toggleSnack(
          true,
          `Crawl finished for ${completedWebsite.domain}. Average score across pages ${adaScoreAverage}`,
          'success'
        )
        forceUpdate()

        // TODO: only re-fetch website updated or send data required from subscription.
        await refetch()
      }
    },
    [websites, refetch]
  )

  useSubscription(CRAWL_COMPLETE_SUBSCRIPTION, {
    variables: subscriptionVars,
    onSubscriptionData: onCrawlCompleteSubscription,
  })

  const onIssueSubscription = useCallback(
    ({ subscriptionData }: OnSubscriptionDataOptions<any>) => {
      const newIssue = subscriptionData?.data?.issueAdded

      if (newIssue) {
        // TODO: use issue feed instead of binding to website property
        const dataSource = { ...issueFeed?.data }

        if (!dataSource[newIssue.domain]) {
          dataSource[newIssue.domain] = {}
        }

        // move to object outside and clear on subscription from website crawl finished
        dataSource[newIssue.domain][newIssue.pageUrl] = newIssue

        setIssueFeedContent(dataSource, true)

        AppManager.toggleSnack(
          true,
          `Insight found on ${newIssue?.pageUrl}`,
          'success'
        )
      }
    },
    [websites, issueFeed]
  )

  const { data: issueSubData } = useSubscription(ISSUE_SUBSCRIPTION, {
    variables: subscriptionVars,
    onSubscriptionData: onIssueSubscription,
    skip,
  })

  useEffect(() => {
    const updatedWebsite = updateData && updateData?.updateWebsite?.website

    if (updatedWebsite) {
      const dataSource = websites.find(
        (source: Website) => source.domain === updatedWebsite?.domain
      )

      if (dataSource) {
        if (updatedWebsite?.pageHeaders) {
          dataSource.pageHeaders = updatedWebsite.pageHeaders
        }

        // todo move to toggle feedback
        if (dataSource.pageInsights !== updatedWebsite.pageInsights) {
          AppManager.toggleSnack(
            true,
            `Success lighthouse ${
              updatedWebsite.pageInsights ? 'enabled' : 'disabled'
            }`,
            'success'
          )
        }

        dataSource.pageInsights = updatedWebsite.pageInsights

        // TODO: MOVE STATE MANAGE OUT OF APOLLO CACHE
        forceUpdate()
      }
    }
  }, [updateData, forceUpdate])

  useEffect(() => {
    if (addWebsiteData && !addWebsiteData?.addWebsite?.success) {
      AppManager.toggleSnack(true, addWebsiteData.addWebsite.message)
    }
  }, [addWebsiteData])

  const updateQuery = (prev: any, { fetchMoreResult }: any) => {
    if (!fetchMoreResult) {
      return prev
    }

    if (!fetchMoreResult?.user?.websites?.length) {
      AppManager.toggleSnack(true, 'No more websites exist.')
      return prev
    }

    const websites = [
      ...prev?.user?.websites,
      ...fetchMoreResult?.user?.websites,
    ]

    return Object.assign({}, prev, {
      user: {
        ...prev?.user,
        websites,
      },
    })
  }

  // EVENTS

  const crawlWebsite = async (params: any) => {
    const canCrawl = await crawl(params)

    // reset the feed on new crawls.
    if (canCrawl && !!issueFeed?.data) {
      setIssueFeedContent({}, false)
    }
  }

  const scanWebsite = async (params: any) => {
    const canScan = await scan(params)
    // TODO: add handling for errors
    return canScan?.data?.scanWebsite?.website
  }

  const onLoadMoreWebsites = async () => {
    try {
      await fetchMore({
        query: GET_WEBSITES,
        variables: {
          offset: Number(issueData.length || 0),
        },
        updateQuery,
      })
    } catch (e) {
      console.error(e)
    }
  }

  const onLoadMoreIssues = async () => {
    try {
      await fetchMoreIssues({
        query: GET_WEBSITES_INFO,
        variables: {
          offset: Number(issueData.length || 0),
        },
        updateQuery,
      })
    } catch (e) {
      console.error(e)
    }
  }

  const onLoadMorePages = async () => {
    try {
      await fetchMorePages({
        query: GET_WEBSITES_INFO,
        variables: {
          offset: Number(pagesData.length || 0),
        },
        updateQuery,
      })
    } catch (e) {
      console.error(e)
    }
  }

  return {
    subscriptionData: {
      issueSubData,
    },
    data: websites, // TODO: rename to websites.
    issueData, // [scoped] collection of issues
    pagesData, // [scoped] collection of pages
    pagesDataLoading, // [scoped] pages loading
    issueDataLoading, // [scoped] issues loading
    loading,
    error, // general mutation error
    mutatationLoading:
      removeLoading || addLoading || crawlLoading || scanLoading,
    issueFeed, // feed side panel that appears on the right
    lighthouseVisible,
    setLighthouseVisibility,
    removeWebsite,
    addWebsite: addWebsiteMutation,
    refetch,
    crawlWebsite,
    scanWebsite, // single page web scan
    updateWebsite,
    setIssueFeedContent,
    // pagination
    onLoadMoreWebsites,
    onLoadMoreIssues,
    onLoadMorePages,
  }
}

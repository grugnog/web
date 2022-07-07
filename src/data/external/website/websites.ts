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
import type { OnSubscriptionDataOptions } from '@apollo/react-common'
import type { Website } from '@app/types'
import { useWasmContext } from '@app/components/providers'
import { domainName } from '@app/lib/domain'

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
  const { feed } = useWasmContext()
  const [_, forceUpdate] = useReducer((x) => x + 1, 0) // top level force update state
  const [lighthouseVisible, setLighthouseVisibility] = useState<boolean>(true)
  const [feedOpen, setIssueFeedContent] = useState<boolean>(false)

  const issueFeed = {
    open: feedOpen,
    data: feed?.get_data() ?? {},
  }

  const [activeCrawls, setActiveCrawl] = useState<
    { [key: string]: boolean } | Record<string, any>
  >({})

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
    skip: skip || !!scopedQuery, // when scoped queries ignore the initial result
    ssr: false,
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
    ssr: false,
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
    ssr: false,
  })

  // Get Website Analytics
  const {
    data: analyticsResults,
    loading: analyticsDataLoading,
    fetchMore: fetchMoreAnalytics,
  } = useQuery(GET_WEBSITES_INFO, {
    variables: {
      ...variables,
      limit: 5,
      offset: 0,
    },
    skip: scopedQuery !== 'analytics',
    ssr: false,
  })

  // Get Scripts Pages
  const {
    data: scriptsResults,
    loading: scriptsDataLoading,
    fetchMore: fetchMoreScripts,
  } = useQuery(GET_WEBSITES_INFO, {
    variables: {
      ...variables,
      limit: 5,
      offset: 0,
    },
    skip: scopedQuery !== 'scripts',
    ssr: false,
  })

  // Get Scripts Pages
  const {
    data: actionResults,
    loading: actionsDataLoading,
    fetchMore: fetchMoreActions,
  } = useQuery(GET_WEBSITES_INFO, {
    variables: {
      ...variables,
      limit: 5,
      offset: 0,
    },
    ssr: false,
    skip: scopedQuery !== 'actions',
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
  const analyticsData = useMemo(() => {
    return analyticsResults?.user?.websites || []
  }, [analyticsResults])
  const scriptsData = useMemo(() => {
    return scriptsResults?.user?.websites || []
  }, [scriptsResults])
  const actionsData = useMemo(() => {
    return actionResults?.user?.websites || []
  }, [actionResults])

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

        // TODO: check crawl tld and subdomain types for crawl targeting.
        setActiveCrawl((v) => ({
          ...v,
          [completedWebsite.domain]: false,
        }))

        await refetch()
      }
    },
    [websites, refetch, setActiveCrawl]
  )

  useSubscription(CRAWL_COMPLETE_SUBSCRIPTION, {
    variables: subscriptionVars,
    onSubscriptionData: onCrawlCompleteSubscription,
  })

  const onIssueSubscription = useCallback(
    ({ subscriptionData }: OnSubscriptionDataOptions<any>) => {
      const newIssue = subscriptionData?.data?.issueAdded

      feed?.insert_website(newIssue)
      setIssueFeedContent(true) // display content open

      setTimeout(() => {
        AppManager.toggleSnack(
          true,
          `Insight found on ${newIssue?.pageUrl}`,
          'success'
        )
      }, 0)
    },
    [websites, issueFeed, feed]
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

        setTimeout(() => {
          // TODO: MOVE STATE MANAGE OUT OF APOLLO CACHE
          forceUpdate()
        }, 0)
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
    try {
      await crawl(params)
      let domain = ''

      try {
        domain = domainName(new URL(params.variables.url).hostname)
      } catch (e) {
        console.error(e)
      }

      if (domain) {
        setActiveCrawl((v) => ({
          ...v,
          [domain]: true,
        }))
      }
    } catch (e) {
      console.error(e)
    }
  }

  const scanWebsite = async (params: any) => {
    const canScan = await scan(params)
    // TODO: add handling for errors
    return canScan?.data?.scanWebsite?.website
  }

  // dashboard page pagination
  const onLoadMoreWebsites = async () => {
    try {
      await fetchMore({
        query: GET_WEBSITES,
        variables: {
          offset: Number(websites.length || 0),
        },
        updateQuery,
      })
    } catch (e) {
      console.error(e)
    }
  }

  // issue page pagination
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

  // pages page pagination
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

  // analytics page pagination
  const onLoadMoreAnalytics = async () => {
    try {
      await fetchMoreAnalytics({
        query: GET_WEBSITES_INFO,
        variables: {
          offset: Number(analyticsData.length || 0),
        },
        updateQuery,
      })
    } catch (e) {
      console.error(e)
    }
  }

  // scripts page pagination
  const onLoadMoreScripts = async () => {
    try {
      await fetchMoreScripts({
        query: GET_WEBSITES_INFO,
        variables: {
          offset: Number(scriptsData.length || 0),
        },
        updateQuery,
      })
    } catch (e) {
      console.error(e)
    }
  }

  // actions page pagination
  const onLoadMoreActions = async () => {
    try {
      await fetchMoreActions({
        query: GET_WEBSITES_INFO,
        variables: {
          offset: Number(actionsData.length || 0),
        },
        updateQuery,
      })
    } catch (e) {
      console.error(e)
    }
  }

  const setFeed = (open: boolean) => {
    if (!open) {
      feed?.clear_data()
    }
    setIssueFeedContent(open)
  }

  return {
    subscriptionData: {
      issueSubData,
    },
    data: websites, // TODO: rename to websites.
    issueData, // [scoped] collection of issues
    pagesData, // [scoped] collection of pages
    analyticsData, // [scoped] collection of analytics
    scriptsData, // [scoped] collection of scripts
    actionsData, // [scopred] collection of actions
    analyticsDataLoading, // [scoped] analytics loading]
    scriptsDataLoading, // [scoped] scripts loading
    pagesDataLoading, // [scoped] pages loading
    issueDataLoading, // [scoped] issues loading
    actionsDataLoading, // [scoped] issues loading
    loading,
    error, // general mutation error
    mutatationLoading:
      removeLoading || addLoading || crawlLoading || scanLoading,
    issueFeed, // issue feed from wasm
    lighthouseVisible,
    setLighthouseVisibility,
    removeWebsite,
    addWebsite: addWebsiteMutation,
    refetch,
    crawlWebsite,
    scanWebsite, // single page web scan
    updateWebsite,
    setIssueFeedContent: setFeed,
    // pagination
    onLoadMoreWebsites,
    onLoadMoreIssues,
    onLoadMorePages,
    onLoadMoreAnalytics,
    onLoadMoreScripts,
    onLoadMoreActions,
    // other state
    activeCrawls,
  }
}

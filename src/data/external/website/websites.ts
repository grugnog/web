import { useEffect, useCallback, useReducer, useMemo } from 'react'
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks'
import {
  ADD_WEBSITE,
  REMOVE_WEBSITE,
  UPDATE_WEBSITE,
  CRAWL_WEBSITE,
  SCAN_WEBSITE,
} from '@app/mutations'
import { GET_WEBSITES, GET_ISSUES, updateCache } from '@app/queries'
import {
  SUBDOMAIN_SUBSCRIPTION,
  ISSUE_SUBSCRIPTION,
  CRAWL_COMPLETE_SUBSCRIPTION,
} from '@app/subscriptions'
import { UserManager, AppManager } from '@app/managers'
import { useIssueFeed } from '../../local'
import type { OnSubscriptionDataOptions } from '@apollo/react-common'
import type { Website } from '@app/types'

// TODO: REFACTOR QUERIES
export const useWebsiteData = (
  filter: string = '',
  url: string = '',
  customHeaders: any = null,
  skip: boolean = false,
  scopedQuery: string = ''
) => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0)
  const subscriptionVars = { userId: UserManager.getID }
  const variables = {
    filter,
    customHeaders,
    url,
  }
  const { issueFeed, setIssueFeedContent } = useIssueFeed()

  // start of main queries for pages. Root gets all
  const { data, loading, refetch, error } = useQuery(GET_WEBSITES, {
    variables,
    skip,
  })
  // Only get issues from websites
  const { data: issuesResults, loading: issueDataLoading } = useQuery(
    GET_ISSUES,
    {
      variables,
      skip: scopedQuery !== 'issues',
    }
  )

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
  const [crawl, { loading: crawlLoading }] = useMutation(CRAWL_WEBSITE)
  const [scan, { loading: scanLoading }] = useMutation(SCAN_WEBSITE)

  // SCOPE WEBSITE DATA PER ROUTE (ALL, ISSUES, PAGES)
  const websites = useMemo(() => {
    return data?.user?.websites || []
  }, [data])

  const issueData = useMemo(() => {
    return issuesResults?.user?.websites || []
  }, [issuesResults])

  const issueDataExists: boolean = !!issueFeed?.data

  const crawlWebsite = async (params: any) => {
    const canCrawl = await crawl(params)
    if (canCrawl && issueDataExists) {
      setIssueFeedContent([], false)
    }
  }

  const scanWebsite = async (params: any) => {
    const canScan = await scan(params)
    // TODO: add handling for errors
    return canScan?.data?.scanWebsite?.website
  }

  const updateSubDomain = useCallback(
    ({ subscriptionData }: OnSubscriptionDataOptions<any>) => {
      const newSubDomain = subscriptionData?.data?.subDomainAdded
      const dataSource = websites.find(
        (source: Website) => source.domain === newSubDomain?.domain
      )
      if (dataSource && newSubDomain && websites?.length) {
        queueMicrotask(() => {
          if (dataSource?.subDomains?.length) {
            // TODO: prevent dup comains
            dataSource.subDomains.push(newSubDomain)
          } else {
            dataSource.subDomains = [newSubDomain]
          }

          if (dataSource?.url === newSubDomain?.url) {
            dataSource.adaScore = newSubDomain.adaScore
            dataSource.online = newSubDomain.online
            dataSource.insight = newSubDomain.insight
            dataSource.cdnConnected = newSubDomain.cdnConnected
            dataSource.pageLoadTime = newSubDomain.pageLoadTime
          }

          forceUpdate()
        })
      }
    },
    [websites, forceUpdate]
  )

  useSubscription(SUBDOMAIN_SUBSCRIPTION, {
    variables: subscriptionVars,
    onSubscriptionData: updateSubDomain,
  })

  // website crawl finished
  const onCrawlCompleteSubscription = useCallback(
    ({ subscriptionData }: OnSubscriptionDataOptions<any>) => {
      const completedWebsite = subscriptionData?.data?.crawlComplete
      if (completedWebsite) {
        queueMicrotask(() => {
          // use apollo cache instead
          const dataSource = websites.find(
            (source: any) => source.domain === completedWebsite.domain
          )

          if (dataSource) {
            const adaScoreAverage = completedWebsite.adaScoreAverage
            dataSource.adaScoreAverage = adaScoreAverage
            dataSource.issueFeed = {} // reset to empty object
            AppManager.toggleSnack(
              true,
              `Crawl finished for ${completedWebsite.domain}. Average score across pages ${adaScoreAverage}`,
              'success'
            )
            forceUpdate()
          }
        })
      }
    },
    [websites]
  )

  useSubscription(CRAWL_COMPLETE_SUBSCRIPTION, {
    variables: subscriptionVars,
    onSubscriptionData: onCrawlCompleteSubscription,
  })

  const onIssueSubscription = useCallback(
    ({ subscriptionData }: OnSubscriptionDataOptions<any>) => {
      const newIssue = subscriptionData?.data?.issueAdded
      if (newIssue) {
        queueMicrotask(() => {
          // use apollo cache instead
          const dataSource = websites.find(
            (source: Website) => source.domain === newIssue.domain
          )

          if (dataSource) {
            // MUTATION UPDATING WEBSITES
            if (!dataSource.issueFeed) {
              // temp map of all live issues
              dataSource.issueFeed = {}
            }
            // move to object outside and clear on subscription from website crawl finished
            dataSource.issueFeed[newIssue.pageUrl] = newIssue
            dataSource.issues = Object.values(dataSource.issueFeed) // todo move to complete storing of issues key,value based

            const mainFeed = issueFeed?.data ?? []
            mainFeed.push(newIssue)

            setIssueFeedContent(mainFeed, true)

            AppManager.toggleSnack(
              true,
              `Insight found on ${newIssue?.pageUrl}`,
              'success'
            )
          }
        })
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

        if (dataSource.pageInsights !== updatedWebsite.pageInsights) {
          AppManager.toggleSnack(
            true,
            `Success lighthouse ${
              dataSource.pageInsights ? 'enabled' : 'disabled'
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

  return {
    subscriptionData: {
      issueSubData,
    },
    data: websites,
    issueData: issueData,
    issueDataLoading: issueDataLoading,
    loading,
    mutatationLoading:
      removeLoading ||
      addLoading ||
      crawlLoading ||
      scanLoading ||
      issueDataLoading,
    error,
    issueFeed,
    removeWebsite,
    addWebsite: addWebsiteMutation,
    refetch,
    crawlWebsite,
    scanWebsite, // single page web scan
    updateWebsite,
    setIssueFeedContent,
  }
}

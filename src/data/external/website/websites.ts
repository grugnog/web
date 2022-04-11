import { useEffect, useCallback, useReducer, useMemo } from 'react'
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks'
import {
  ADD_WEBSITE,
  REMOVE_WEBSITE,
  UPDATE_WEBSITE,
  CRAWL_WEBSITE,
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
  const { data: issueData, loading: issueDataLoading } = useQuery(GET_ISSUES, {
    variables,
    skip: scopedQuery !== 'issues',
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
  const [crawlWebsite, { loading: crawlLoading }] = useMutation(CRAWL_WEBSITE)

  // SCOPE WEBSITE DATA PER ROUTE (ALL, ISSUES, PAGES)
  const websites = useMemo(() => {
    const dataTarget = data ?? issueData
    return dataTarget?.user?.websites || []
  }, [data, issueData])

  const updateSubDomain = useCallback(
    ({ subscriptionData }: OnSubscriptionDataOptions<any>) => {
      const newSubDomain = subscriptionData?.data?.subDomainAdded
      const dataSource = websites.find(
        (source: Website) => source.domain === newSubDomain?.domain
      )
      if (dataSource && newSubDomain && websites?.length) {
        queueMicrotask(() => {
          if (dataSource?.subDomains?.length) {
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

  const onCrawlCompleteSubscription = useCallback(
    ({ subscriptionData }: OnSubscriptionDataOptions<any>) => {
      queueMicrotask(() => {
        const completedWebsite = subscriptionData?.data?.crawlComplete

        if (completedWebsite) {
          // use apollo cache instead
          const dataSource = websites.find(
            (source: any) => source.domain === completedWebsite.domain
          )

          if (dataSource) {
            const adaScoreAverage = completedWebsite.adaScoreAverage
            dataSource.adaScoreAverage = adaScoreAverage
            AppManager.toggleSnack(
              true,
              `Crawl finished for ${completedWebsite.domain}. Average score across pages ${adaScoreAverage}`,
              'success'
            )
            forceUpdate()
          }
        }
      })
    },
    [websites]
  )

  useSubscription(CRAWL_COMPLETE_SUBSCRIPTION, {
    variables: subscriptionVars,
    onSubscriptionData: onCrawlCompleteSubscription,
  })

  const onIssueSubscription = useCallback(
    ({ subscriptionData }: OnSubscriptionDataOptions<any>) => {
      queueMicrotask(() => {
        const newIssue = subscriptionData?.data?.issueAdded

        if (newIssue) {
          // use apollo cache instead
          const dataSource = websites.find(
            (source: Website) => source.domain === newIssue.domain
          )
          const hasIssues = dataSource?.issues?.length

          if (dataSource) {
            // MUTATION UPDATING WEBSITES
            if (hasIssues) {
              const ids = new Set(dataSource.issues.map((d: any) => d.pageUrl))
              const merged = [
                ...dataSource.issues,
                ...[newIssue].filter((d: any) => !ids.has(d.pageUrl)),
              ]
              dataSource.issues = merged
            } else {
              dataSource.issues = [newIssue]
            }

            setIssueFeedContent(dataSource.issues, true)
            AppManager.toggleSnack(
              true,
              `Insight found on ${newIssue?.pageUrl}`,
              'success'
            )
          }
        }
      })
    },
    [websites]
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
      AppManager.toggleSnack(true, addWebsiteData.addWebsite.message, 'warning')
    }
  }, [addWebsiteData])

  return {
    subscriptionData: {
      issueSubData,
    },
    data: websites,
    loading,
    mutatationLoading:
      removeLoading || addLoading || crawlLoading || issueDataLoading,
    error,
    issueFeed,
    removeWebsite,
    addWebsite: addWebsiteMutation,
    refetch,
    crawlWebsite,
    updateWebsite,
    setIssueFeedContent,
  }
}

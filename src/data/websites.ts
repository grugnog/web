/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useEffect, useCallback } from 'react'
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks'
import {
  ADD_WEBSITE,
  REMOVE_WEBSITE,
  UPDATE_WEBSITE,
  CRAWL_WEBSITE,
} from '@app/mutations'
import { GET_WEBSITES, updateCache } from '@app/queries'
import {
  SUBDOMAIN_SUBSCRIPTION,
  ISSUE_SUBSCRIPTION,
  WEBSITE_SUBSCRIPTION,
} from '@app/subscriptions'
import { UserManager, AppManager } from '@app/managers'
import { useIssueFeed } from './local'
// import { sendNotification } from '@app/lib'
import type { OnSubscriptionDataOptions } from '@apollo/react-common'
import type { Website } from '@app/types'

export const useWebsiteData = (
  filter: string = '',
  url: string = '',
  customHeaders: any = null,
  skip: boolean = false
) => {
  const variables = {
    filter,
    customHeaders,
    url,
  }
  const subscriptionVars = { userId: UserManager.getID }

  const { issueFeed, setIssueFeedContent } = useIssueFeed()
  const { data, loading, refetch, error } = useQuery(GET_WEBSITES, {
    variables,
    skip,
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
  const [
    crawlWebsite,
    { data: crawlData, loading: crawlLoading },
  ] = useMutation(CRAWL_WEBSITE)

  const websites = data?.user?.websites || []

  const updateSubDomain = useCallback(
    ({ subscriptionData }: OnSubscriptionDataOptions<any>) => {
      const newSubDomain = subscriptionData?.data?.subDomainAdded

      if (newSubDomain && websites?.length) {
        const dataSource = websites.find(
          (source: Website) => source.domain === newSubDomain?.domain
        )

        if (dataSource) {
          if (dataSource?.subDomains.length) {
            dataSource.subDomains.push(newSubDomain)
          } else {
            dataSource.subDomains = [newSubDomain]
          }
        }
      }
    },
    [websites]
  )

  useSubscription(SUBDOMAIN_SUBSCRIPTION, {
    variables: subscriptionVars,
    onSubscriptionData: updateSubDomain,
  })

  const onIssueSubscription = useCallback(
    ({ subscriptionData }: OnSubscriptionDataOptions<any>) => {
      const newIssue = subscriptionData?.data?.issueAdded

      if (newIssue) {
        const dataSource = websites.find(
          (source: any) => source.domain === newIssue.domain
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
    },
    [websites]
  )

  const { data: issueSubData } = useSubscription(ISSUE_SUBSCRIPTION, {
    variables: subscriptionVars,
    onSubscriptionData: onIssueSubscription,
    skip,
  })

  const { data: websiteUpdated } = useSubscription(WEBSITE_SUBSCRIPTION, {
    variables: subscriptionVars,
    skip,
  })

  useEffect(() => {
    updateCache.last = [...updateCache.last, ...websites]
  }, [websites])

  useEffect(() => {
    if (updateData?.updateWebsite?.website) {
      const dataSource = websites.find(
        (source: Website) =>
          source.domain === updateData?.updateWebsite?.website?.domain
      )

      if (dataSource) {
        dataSource.pageHeaders = updateData?.updateWebsite?.website?.pageHeaders
        AppManager.toggleSnack(true, 'Success: updated website', 'success')
      }
    }
  }, [updateData])

  useEffect(() => {
    if (websiteUpdated && websites?.length) {
      const {
        adaScore,
        cdnConnected,
        domain,
        htmlIncluded,
        html,
        pageLoadTime,
        issuesInfo,
      } = websiteUpdated?.websiteAdded
      const dataSource = websites.find(
        (source: Website) => source.domain === domain
      )

      if (dataSource) {
        if (adaScore) {
          dataSource.adaScore = adaScore
        }
        if (pageLoadTime) {
          dataSource.pageLoadTime = pageLoadTime
        }
        if (issuesInfo) {
          dataSource.issuesInfo = issuesInfo
        }
        if (html) {
          dataSource.html = html
        }

        dataSource.cdnConnected = cdnConnected
        dataSource.htmlIncluded = htmlIncluded
      }
    }
  }, [websiteUpdated])

  useEffect(() => {
    if (addWebsiteData && !addWebsiteData?.addWebsite?.success) {
      AppManager.toggleSnack(true, addWebsiteData.addWebsite.message, 'warning')
    }
  }, [addWebsiteData])

  useEffect(() => {
    if (crawlData && websites?.length) {
      const crawledWebsite = crawlData?.crawlWebsite?.website
      let dataSource = websites.find(
        (source: Website) => source.domain === crawledWebsite?.domain
      )

      if (dataSource) {
        dataSource = crawledWebsite
      }
    }
  }, [crawlData])

  const addWebsite = useCallback(
    async (variables: { url?: string; customHeaders?: string[] }) => {
      AppManager.toggleSnack(
        true,
        'Checking all pages for issues, please wait...',
        'success'
      )
      try {
        return await addWebsiteMutation({
          variables: {
            userId: UserManager?.getID,
            ...variables,
          },
        })
      } catch (e) {
        console.error(e)
      }
    },
    [addWebsiteMutation]
  )

  const removePress = async (url?: string, deleteMany: boolean = false) => {
    try {
      await removeWebsite({
        variables: {
          url,
          userId: UserManager?.getID,
          deleteMany,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  return {
    subscriptionData: {
      issueSubData,
    },
    data: websites,
    loading,
    mutatationLoading: removeLoading || addLoading || crawlLoading,
    error,
    issueFeed,
    removeWebsite,
    addWebsite,
    refetch,
    crawlWebsite,
    updateWebsite,
    setIssueFeedContent,
    removePress,
  }
}

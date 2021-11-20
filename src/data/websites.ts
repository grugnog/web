/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useState, useEffect, useCallback } from 'react'
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
import { sendNotification } from '@app/lib'
import type { OnSubscriptionDataOptions } from '@apollo/react-common'

export const useWebsiteData = (
  filter: string = '',
  url: string = '',
  customHeaders: any = null
) => {
  const variables = {
    filter,
    customHeaders,
    url,
  }
  const skip = !UserManager.loggedIn
  const [modalOpen, setOpen] = useState<boolean>(false)
  const { issueFeed, setIssueFeedContent } = useIssueFeed()
  const { data, loading, refetch, error } = useQuery(GET_WEBSITES, {
    variables,
    skip,
  })

  const [removeWebsite, { loading: removeLoading }] = useMutation(
    REMOVE_WEBSITE,
    updateCache
  )
  const [addWebsiteMutation, { loading: addLoading }] = useMutation(
    ADD_WEBSITE,
    updateCache
  )
  const [updateWebsite, { data: updateData }] = useMutation(UPDATE_WEBSITE, {
    variables,
  })
  const [
    crawlWebsite,
    { data: crawlData, loading: crawlLoading },
  ] = useMutation(CRAWL_WEBSITE)

  const { data: subDomainSubData } = useSubscription(SUBDOMAIN_SUBSCRIPTION, {
    variables: { userId: UserManager.getID },
    skip,
  })

  const websites = data?.user?.websites || []

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
        }

        AppManager.toggleSnack(
          true,
          `Insight found on ${newIssue?.pageUrl}`,
          'success'
        )
        if (dataSource) {
          setIssueFeedContent(dataSource.issues, true)
        }
        sendNotification(newIssue?.pageUrl || '', newIssue?.issues?.length || 0)
      }
    },
    [websites]
  )

  const { data: issueSubData } = useSubscription(ISSUE_SUBSCRIPTION, {
    variables: { userId: UserManager.getID },
    onSubscriptionData: onIssueSubscription,
    skip,
  })

  const { data: websiteUpdated } = useSubscription(WEBSITE_SUBSCRIPTION, {
    variables: { userId: UserManager.getID },
    skip,
  })

  useEffect(() => {
    updateCache.last = [...updateCache.last, ...websites]
  }, [websites])

  useEffect(() => {
    if (updateData?.updateWebsite?.website) {
      const { pageHeaders, domain } = updateData?.updateWebsite?.website
      const dataSource = websites.find(
        (source: any) => source.domain === domain
      )

      if (dataSource) {
        dataSource.pageHeaders = pageHeaders
      }

      AppManager.toggleSnack(true, 'Success: updated website', 'success')
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
        lastScanDate,
        issuesInfo,
        script,
      } = websiteUpdated?.websiteAdded
      const dataSource = websites.find(
        (source: any) => source.domain === domain
      )

      if (dataSource) {
        if (adaScore) {
          dataSource.adaScore = adaScore
        }
        if (script) {
          dataSource.script = script
        }
        if (lastScanDate) {
          dataSource.lastScanDate = lastScanDate
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
    if (crawlData && websites?.length) {
      const crawledWebsite = crawlData?.crawlWebsite?.website
      const dataSource = websites.find(
        (source: any) => source.domain === crawledWebsite?.domain
      )

      if (dataSource) {
        dataSource.adaScore = crawledWebsite.adaScore
        dataSource.cdnConnected = crawledWebsite.cdnConnected
      }
    }
  }, [crawlData])

  useEffect(() => {
    if (subDomainSubData && websites?.length) {
      const newSubDomain = subDomainSubData?.subDomainAdded
      const dataSource = websites.find(
        (source: any) => source.domain === newSubDomain?.domain
      )

      if (dataSource) {
        if (dataSource?.subDomains.length) {
          dataSource.subDomains.push(newSubDomain)
        } else {
          dataSource.subDomains = [newSubDomain]
        }
      }
    }
  }, [subDomainSubData])

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

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClickClose = () => {
    setOpen(false)
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
    handleClickOpen,
    handleClickClose,
    modalOpen,
  }
}

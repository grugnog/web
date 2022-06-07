import React, { useState, useMemo, useCallback, memo } from 'react'
import { MoreOptions } from '@app/components/general/cells/menu/more'
import { Link } from '../link'
import { WebsiteSecondary } from './render'
import {
  SCRIPTS_CDN_URL_HOST,
  BASE_GQL_URL,
  STATUS_URL,
} from '@app/configs/app-config'
import ReportViewer from 'next-lighthouse'

import {
  AccessibilityBox,
  PagesBox,
  LoadTimeBox,
  HeadersBox,
  LighthouseBox,
  OnlineBox,
  StatusBadgeBox,
  CustomCDNBox,
  StandardBox,
  IssuesBox,
  WarningsBox,
} from './blocks'
import { MobileBox } from './blocks/mobile'
import { Issue } from '@app/types'
import { Timer } from '../timer'
import { UserAgentBox } from './blocks/user-agent'
import { ActionsBox } from './blocks/actions'
import { CdnFixBox } from './blocks/cdn-fix'
import { UserManager } from '@app/managers'

const styles = {
  title: 'text-xl md:text-3xl font-bold truncate',
  spacing: 'py-2',
  row: 'flex flex-1',
  metaBlock: 'px-2 py-1 border',
}

// TODO: add types
export function WebsiteCellDashboardComponent({
  url,
  removePress,
  handleClickOpen,
  subDomains,
  handleClickOpenPlayer,
  issues,
  issuesInfo,
  cdnConnected,
  crawlWebsite,
  pageLoadTime,
  lastScanDate,
  pageHeaders,
  index,
  script,
  domain,
  online,
  insight,
  pageInsights,
  mobile,
  lighthouseVisible,
  standard,
  activeCrawl,
  crawlDuration,
  ua,
  actions,
}: any) {
  const [anchorEl, setAnchorEl] = useState<any>(null)

  const handleMenu = useCallback(
    (event: any) => {
      setAnchorEl(event?.currentTarget)
    },
    [setAnchorEl]
  )

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [setAnchorEl])

  const onRemovePress = useCallback(async () => {
    try {
      await removePress({
        variables: {
          url,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }, [url, removePress])

  const handleMainClick = (
    eventData?: any,
    title?: string,
    mini?: boolean,
    url?: string
  ) => () => {
    // mini player open - small modal with dynamic content
    if (mini) {
      handleClickOpenPlayer(true, eventData, title)()
    } else if (handleClickOpen) {
      handleClickOpen(eventData, title, url)
    }

    setAnchorEl(null)
  }

  const cdnBase =
    script?.cdnUrl ?? `${domain}/${domain.replace(/\./g, '-')}-ada-fix-0.js`

  const cdnBaseMin =
    script?.cdnUrlMinified ??
    `${domain}/${domain.replace(/\./g, '-')}-ada-fix-0.min.js`

  // TODO: REMOVE ALL URL CLIENT APPENDING
  const statusBadgeUrl = `${STATUS_URL}/${encodeURIComponent(domain)}`

  const encodedUrl = encodeURIComponent(url)

  const reportsLink = `${BASE_GQL_URL}/${encodedUrl}`
  const reportsPageLink = `/reports/${encodedUrl}`

  const parsedInsight = useMemo(() => {
    // TODO: Handles Deprecated pages
    if (insight && insight?.json) {
      try {
        return JSON.parse(insight?.json)
      } catch (_) {}
    }
    return null
  }, [insight])

  const linkUrl = useMemo(
    () => `/website-details?url=${encodeURIComponent(url)}`,
    [url]
  )

  // real time issue tracking [TODO: combine with website analytic data]
  const {
    errorCount,
    warningCount,
    totalIssues,
    issuesFixedByCdn,
  } = useMemo(() => {
    let errors = 0
    let warnings = 0
    let notices = 0

    if (issues?.length) {
      issues.forEach((iss: any) => {
        const pageIssues = iss?.issues

        pageIssues?.forEach((page: Issue) => {
          if (page?.type === 'error') {
            errors++
          }
          if (page?.type === 'warning') {
            warnings++
          }
          if (page?.type === 'notice') {
            notices++
          }
        })
      })
    } else {
      errors = issuesInfo?.errorCount
      warnings = issuesInfo?.warningCount
      notices = issuesInfo?.noticesCount
    }

    return {
      issuesFixedByCdn: issuesInfo?.issuesFixedByCdn,
      errorCount: errors,
      warningCount: warnings,
      noticeCount: notices,
      totalIssues: errors + warnings + notices,
    }
  }, [issues, issuesInfo])

  const pageIssueCount =
    issues?.length > issuesInfo?.pageCount
      ? issues.length
      : issuesInfo?.pageCount

  const { adaScoreAverage: adaScore } = issuesInfo ?? {}

  // TODO: move to react context for SSR
  const activeSubscription = UserManager.freeAccount === false

  const cdnUrl = cdnBase
    ? `${SCRIPTS_CDN_URL_HOST}/${cdnBase}`
    : 'Plan Required'
  const cdnUrlMinifed = cdnBaseMin
    ? `${SCRIPTS_CDN_URL_HOST}/${cdnBaseMin}`
    : 'Plan Required'

  return (
    <li className={`border-4 px-3 pt-2 rounded overflow-hidden`}>
      <div className='flex space-x-2 place-items-center'>
        <div className={`${styles.title} flex-1 flex space-x-2`}>
          <Link
            title={`view in sandbox ${url}`}
            href={linkUrl}
            className={styles.title}
          >
            {url}
          </Link>
          <Timer stop={!activeCrawl} duration={crawlDuration} />
        </div>
        <div>
          <MoreOptions
            url={url}
            issues={issues}
            crawlWebsite={crawlWebsite}
            handleClose={handleClose}
            handleMenu={handleMenu}
            handleMainClick={handleMainClick}
            anchorEl={anchorEl}
            removePress={onRemovePress}
            subDomains={subDomains}
            pageHeaders={pageHeaders}
            index={index}
            pageInsights={pageInsights}
          />
        </div>
      </div>
      <WebsiteSecondary
        issuesInfo={{
          ...issuesInfo,
          totalIssues:
            totalIssues > issuesInfo?.totalIssues
              ? totalIssues
              : issuesInfo?.totalIssues,
        }}
        pageIssueCount={pageIssueCount}
        cdnConnected={cdnConnected}
        adaScore={adaScore}
        issues={issues}
        pageLoadTime={pageLoadTime}
        lastScanDate={lastScanDate}
        pageHeaders={pageHeaders}
      />
      <div className={styles.spacing} />
      <div className='grid grid-cols-1 gap-1 md:grid-cols-3'>
        <AccessibilityBox adaScore={adaScore} />
        <IssuesBox issues={errorCount} />
        <WarningsBox issues={warningCount} />
        <CdnFixBox issues={issuesFixedByCdn} />
        <PagesBox count={pageIssueCount ?? 'N/A'} />
        <LoadTimeBox duration={pageLoadTime?.duration} />
        <StandardBox standard={standard} url={url} />
        <HeadersBox pageHeaders={pageHeaders} />
        <LighthouseBox pageInsights={pageInsights} />
        <UserAgentBox ua={ua} url={url} />
        <ActionsBox actions={actions} />
        <OnlineBox online={online} />
        <CustomCDNBox
          cdnUrl={activeSubscription ? cdnUrl : 'N/A'}
          cdnUrlMinifed={activeSubscription ? cdnUrlMinifed : 'N/A'}
          cdnConnected={cdnConnected}
        />
        <StatusBadgeBox
          reportsLink={reportsLink}
          statusBadgeUrl={statusBadgeUrl}
          domain={domain}
          reportsPageLink={reportsPageLink}
        />
        <MobileBox mobile={mobile} url={url} />
      </div>
      <div className={styles.spacing} />
      <div
        className={`${
          parsedInsight && lighthouseVisible ? 'visible' : 'hidden'
        }`}
      >
        {parsedInsight && 'lighthouseVersion' in parsedInsight ? (
          <ReportViewer json={parsedInsight} />
        ) : null}
      </div>
    </li>
  )
}

export const WebsiteCellDashboard = memo(WebsiteCellDashboardComponent)

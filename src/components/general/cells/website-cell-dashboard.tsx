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
  adaScore,
  adaScoreAverage,
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

  // TODO: REMOVE ALL URL CLIENT APPENDING
  const cdnUrl = script?.cdnUrl
    ? `${SCRIPTS_CDN_URL_HOST}/${script?.cdnUrl}`
    : 'N/A'
  const cdnUrlMinifed = script?.cdnUrlMinified
    ? `${SCRIPTS_CDN_URL_HOST}/${script?.cdnUrlMinified}`
    : 'N/A'
  const statusBadgeUrl = `${STATUS_URL}/${encodeURIComponent(domain)}`

  const encodedUrl = encodeURIComponent(url)

  const reportsLink = `${BASE_GQL_URL}/${encodedUrl}`
  const reportsPageLink = `/reports/${encodedUrl}`

  const parsedInsight = useMemo(() => {
    // TODO: Handles Deprecated pages
    if (insight && insight?.json && insight.json !== `{"json":""}`) {
      const parsed = JSON.parse(insight?.json)

      if (parsed?.json) {
        return JSON.parse(parsed.json)
      }
      return parsed
    }
    return {}
  }, [insight])

  const linkUrl = useMemo(
    () => `/website-details?url=${encodeURIComponent(url)}`,
    [url]
  )

  // real time issue tracking [TODO: combine with website analytic data]
  const { errorCount, warningCount, totalIssues } = useMemo(() => {
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

  return (
    <li className={`border-4 px-3 pt-2 rounded overflow-hidden`}>
      <div className='flex space-x-2 place-items-center'>
        <div className={`${styles.title} flex-1`}>
          <Link
            title={`view in sandbox ${url}`}
            href={linkUrl}
            className={styles.title}
          >
            {url}
          </Link>
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
      <div className='grid grid-cols-1 gap-1 sm:grid-cols-3'>
        <AccessibilityBox
          adaScore={adaScore}
          adaScoreAverage={adaScoreAverage}
        />
        <IssuesBox issues={errorCount} />
        <WarningsBox issues={warningCount} />
        <PagesBox count={pageIssueCount ?? 'N/A'} />
        <LoadTimeBox duration={pageLoadTime?.duration} />
        <StandardBox standard={standard} url={url} />
        <HeadersBox pageHeaders={pageHeaders} />
        <LighthouseBox pageInsights={pageInsights} />
        <OnlineBox online={online} />
        <CustomCDNBox
          cdnUrl={cdnUrl}
          cdnUrlMinifed={cdnUrlMinifed}
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
        className={`py-2 ${
          pageInsights && lighthouseVisible ? 'visible' : 'hidden'
        }`}
      >
        <ReportViewer json={parsedInsight} />
      </div>
    </li>
  )
}

export const WebsiteCellDashboard = memo(WebsiteCellDashboardComponent)

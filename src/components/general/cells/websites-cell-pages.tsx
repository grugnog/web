import React, { useState, useMemo, useCallback, memo } from 'react'
import { Link } from '../link'
import { WebsiteSecondary } from './render'
import ReportViewer from 'next-lighthouse'

import {
  AccessibilityBox,
  LoadTimeBox,
  LighthouseBox,
  OnlineBox,
  IssuesBox,
  WarningsBox,
} from './blocks'
import { Issue } from '@app/types'
import { MoreOptionsBase } from './menu'

const styles = {
  title: 'text-xl md:text-3xl font-bold truncate',
  spacing: 'py-2',
  row: 'flex flex-1',
  metaBlock: 'px-2 py-1 border',
}

// TODO: add types
export function WebsiteCellPagesComponent({
  url,
  removePress,
  handleClickOpen,
  pages,
  handleClickOpenPlayer,
  issues,
  issuesInfo,
  cdnConnected,
  crawlWebsite,
  pageLoadTime,
  lastScanDate,
  pageHeaders,
  index,
  online,
  insight,
  pageInsights,
  lighthouseVisible,
}: any) {
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const { adaScore } = issuesInfo ?? {}

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

  const parsedInsight = useMemo(() => {
    // TODO: Handles Deprecated pages
    if (insight && insight?.json) {
      try {
        return JSON.parse(insight?.json)
      } catch (e) {
        console.error(e)
      }
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
    <li className={`border px-3 pt-2 overflow-hidden`}>
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
          <MoreOptionsBase
            url={url}
            issues={issues}
            crawlWebsite={crawlWebsite}
            handleClose={handleClose}
            handleMenu={handleMenu}
            handleMainClick={handleMainClick}
            anchorEl={anchorEl}
            removePress={onRemovePress}
            pages={pages}
            pageHeaders={pageHeaders}
            index={index}
            pageInsights={pageInsights}
            lh={Object.keys(parsedInsight).length ? parsedInsight : null}
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
        <AccessibilityBox adaScore={adaScore} average={false} />
        <IssuesBox issues={errorCount} />
        <WarningsBox issues={warningCount} />
        <LoadTimeBox duration={pageLoadTime?.duration} />
        <LighthouseBox
          pageInsights={pageInsights || !!Object.keys(parsedInsight).length}
        />
        <OnlineBox online={online} />
      </div>
      <div className={styles.spacing} />
      <div
        className={`py-2 ${
          pageInsights && lighthouseVisible ? 'visible' : 'hidden'
        }`}
        aria-expanded={pageInsights && lighthouseVisible}
      >
        {pageInsights && 'lighthouseVersion' in pageInsights ? (
          <ReportViewer json={parsedInsight} />
        ) : null}
      </div>
    </li>
  )
}

export const WebsiteCellPages = memo(WebsiteCellPagesComponent)

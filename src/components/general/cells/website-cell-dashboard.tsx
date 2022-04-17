import React, { useState, useMemo, useCallback, memo } from 'react'
import { MoreOptions } from '@app/components/general/cells/menu/more'
import { Link } from '../link'
import { WebsiteSecondary } from './render'
import {
  SCRIPTS_CDN_URL_HOST,
  BASE_GQL_URL,
  STATUS_URL,
} from '@app/configs/app-config'
import dynamic from 'next/dynamic'

const ReportViewer = dynamic(() => import('react-lighthouse-viewer')) as any

import {
  AccessibilityBox,
  PagesBox,
  LoadTimeBox,
  HeadersBox,
  LighthouseBox,
  OnlineBox,
  StatusBadgeBox,
  CustomCDNBox,
} from './blocks'

const styles = {
  title: 'block text-3xl font-bold truncate w-full',
  spacing: 'py-2',
  row: 'flex flex-1',
  metaBlock: 'px-2 py-1 border',
}

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
  mutatationLoading,
  lastScanDate,
  pageHeaders,
  index,
  script,
  domain,
  online,
  insight,
  pageInsights,
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

  const onRemovePress = useCallback(() => {
    removePress({
      variables: {
        url,
      },
    })
  }, [url, removePress])

  const handleMainClick = useCallback(
    (eventData?: any, title?: string, mini?: boolean, url?: string) => () => {
      if (mini) {
        handleClickOpenPlayer(true, eventData, title)()
      } else if (handleClickOpen) {
        handleClickOpen(eventData, title, url)
      }

      setAnchorEl(null)
    },
    [handleClickOpenPlayer, handleClickOpen, setAnchorEl]
  )

  // TODO: REMOVE ALL URL CLIENT APPENDING
  const cdnUrl = script?.cdnUrl
    ? `${SCRIPTS_CDN_URL_HOST}/${script?.cdnUrl}`
    : 'N/A'
  const cdnUrlMinifed = script?.cdnUrlMinified
    ? `${SCRIPTS_CDN_URL_HOST}/${script?.cdnUrlMinified}`
    : 'N/A'
  const statusBadgeUrl = `${STATUS_URL}/${domain}`
  const reportsLink = `${BASE_GQL_URL}/${domain}`

  const parsedInsight = useMemo(() => {
    // TODO: REMOVE DOUBLE PARSING OF JSON
    if (insight && insight?.json && insight.json !== `{"json":""}`) {
      const parsed = JSON.parse(insight?.json)

      if (parsed?.json) {
        return JSON.parse(parsed.json)
      }
      return parsed
    }
  }, [insight])

  const linkUrl = useMemo(() => `/website-details?url=${encodeURI(url)}`, [url])

  return (
    <li className={`border px-3 py-2 rounded overflow-hidden`}>
      <div className='flex space-x-2'>
        <div className='contents'>
          <Link
            title={`view in sandbox ${url}`}
            className={styles.title}
            href={linkUrl}
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
        issuesInfo={issuesInfo}
        cdnConnected={cdnConnected}
        adaScore={adaScore}
        issues={issues}
        pageLoadTime={pageLoadTime}
        mutatationLoading={mutatationLoading}
        lastScanDate={lastScanDate}
        pageHeaders={pageHeaders}
      />

      <div className={styles.spacing} />

      <div className={[styles.row, 'flex-wrap gap-x-2 gap-y-1'].join(' ')}>
        <AccessibilityBox
          adaScore={adaScore}
          adaScoreAverage={adaScoreAverage}
        />
        <PagesBox count={subDomains?.length} />
        <LoadTimeBox
          durationFormated={pageLoadTime?.durationFormated}
          duration={pageLoadTime?.duration}
        />
        <HeadersBox pageHeaders={pageHeaders} />
        <LighthouseBox pageInsights={pageInsights} />
        <OnlineBox online={online} />
        <div className='w-full flex space-x-2'>
          <CustomCDNBox
            cdnUrl={cdnUrl}
            cdnUrlMinifed={cdnUrlMinifed}
            cdnConnected={cdnConnected}
          />
          <StatusBadgeBox
            reportsLink={reportsLink}
            statusBadgeUrl={statusBadgeUrl}
            domain={domain}
          />
        </div>
      </div>

      <div className={styles.spacing} />

      {parsedInsight ? (
        <div className='py-2'>
          {/* @ts-ignore */}
          <style>
            {`
            .lh-topbar__url, .report-icon--download {
              display: none !important;
            }
            `}
          </style>
          <ReportViewer json={parsedInsight} />
        </div>
      ) : null}
    </li>
  )
}

export const WebsiteCellDashboard = memo(WebsiteCellDashboardComponent)

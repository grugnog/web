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
import { MobileBox } from './blocks/mobile'

const styles = {
  title: 'text-xl md:text-3xl font-bold truncate',
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
  mobile,
  lighthouseVisible,
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

  const linkUrl = useMemo(
    () => `/website-details?url=${encodeURIComponent(url)}`,
    [url]
  )

  return (
    <li className={`border px-3 pt-2 rounded overflow-hidden`}>
      <div className='flex space-x-2 place-items-center'>
        <div className={`flex-1`}>
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

      <div className='space-y-1'>
        <div className='grid xm:grid-cols-1 gap-1 sm:grid-cols-3'>
          <AccessibilityBox
            adaScore={adaScore}
            adaScoreAverage={adaScoreAverage}
          />
          <PagesBox count={subDomains?.length} />
          <LoadTimeBox duration={pageLoadTime?.duration} />
        </div>
        <div className='grid grid-cols-1 gap-1 sm:grid-cols-3'>
          <HeadersBox pageHeaders={pageHeaders} />
          <LighthouseBox pageInsights={pageInsights} />
          <OnlineBox online={online} />
        </div>
        <div className='grid grid-cols-1 gap-1 sm:grid-cols-3'>
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
          <MobileBox mobile={mobile} url={url} />
        </div>
      </div>

      <div className={styles.spacing} />

      <div
        className={`py-2 ${
          pageInsights && lighthouseVisible ? 'visible' : 'hidden'
        }`}
      >
        <style>
          {`
            .lh-topbar__url, .report-icon--download {
              display: none !important;
            }
            `}
        </style>
        {/* @ts-ignore */}
        {parsedInsight ? <ReportViewer json={parsedInsight} /> : null}
      </div>
    </li>
  )
}

export const WebsiteCellDashboard = memo(WebsiteCellDashboardComponent)

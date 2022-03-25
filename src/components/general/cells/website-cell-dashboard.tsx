import React, { useState, useMemo, useCallback, memo } from 'react'
import { MoreOptions } from '@app/components/general/cells/menu/more'
import { Link } from '../link'
import { WebsiteSecondary } from './render'
import { ModalType } from '@app/data/enums'
import {
  SCRIPTS_CDN_URL_HOST,
  BASE_GQL_URL,
  STATUS_URL,
} from '@app/configs/app-config'
// @ts-ignore
import ReportViewer from 'react-lighthouse-viewer'
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
  title:
    'flex flex-1 text-3xl font-bold text-ellipsis overflow-hidden md:w-1/2 w-48',
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
  cdnConnected,
  crawlWebsite,
  setModal,
  html,
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

  const handleMainClick = (
    eventData?: any,
    title?: string,
    mini?: boolean,
    url?: string
  ) => () => {
    if (mini) {
      handleClickOpenPlayer(true, eventData, title)()
    } else if (handleClickOpen) {
      handleClickOpen(eventData, title, url)
    }

    setAnchorEl(null)
  }

  const modalClick = useCallback(() => {
    setModal({ open: true, modalType: ModalType.highlight, html, url })
    setAnchorEl(null)
  }, [html, url, setModal, setAnchorEl])

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
    if (insight?.json) {
      return JSON.parse(insight?.json)
    }
  }, [insight])

  const linkUrl = useMemo(
    () => `/website-details?websiteUrl=${encodeURIComponent(url)}`,
    [url]
  )

  return (
    <div className={`w-full relative border p-4 pl-6 rounded overflow-hidden`}>
      <div className={'w-full space-y-2'}>
        <div className='flex space-x-2'>
          <div className='flex-wrap flex space-x-4'>
            <Link
              title={`view in sandbox ${url}`}
              className={styles.title}
              href={linkUrl}
            >
              {url}
            </Link>
          </div>
          <div className='flex flex-1 place-content-end'>
            <MoreOptions
              url={url}
              issues={issues}
              crawlWebsite={crawlWebsite}
              handleClose={handleClose}
              handleMenu={handleMenu}
              handleMainClick={handleMainClick}
              modalClick={modalClick}
              anchorEl={anchorEl}
              removePress={onRemovePress}
              subDomains={subDomains}
              html={html}
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
      </div>

      <div className={styles.spacing} />

      <div className={[styles.row, 'flex-wrap gap-x-2 gap-y-1'].join(' ')}>
        <AccessibilityBox adaScore={adaScore} />
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
    </div>
  )
}

export const WebsiteCellDashboard = memo(WebsiteCellDashboardComponent)

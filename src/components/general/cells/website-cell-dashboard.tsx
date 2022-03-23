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
import { prismStyles } from '@app/styles'
import { PrismLight } from 'react-syntax-highlighter'
import { copyClipboard } from '@app/lib'
import { classNames } from '@app/utils'
import { InfoBlock } from './info-block'
// @ts-ignore
import ReportViewer from 'react-lighthouse-viewer'
import {
  AccessibilityBox,
  PagesBox,
  LoadTimeBox,
  CDNBox,
  HeadersBox,
  LighthouseBox,
  OnlineBox,
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
  const [isCdnMinified, setMinified] = useState<boolean>(true)
  const [isMarkdown, setMarkdown] = useState<boolean>(true)

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
  const cdnUrl = `${SCRIPTS_CDN_URL_HOST}/${script?.cdnUrl}`
  const cdnUrlMinifed = `${SCRIPTS_CDN_URL_HOST}/${script?.cdnUrlMinified}`
  const statusBadgeUrl = `${STATUS_URL}/${domain}`
  const reportsLink = `${BASE_GQL_URL}/${domain}`

  const statusBadgeLanguage = isMarkdown ? 'markdown' : 'html'

  const parsedInsight = useMemo(() => {
    if (insight?.json) {
      return JSON.parse(insight?.json)
    }
  }, [insight])

  return (
    <div className={`w-full relative border p-4 pl-6 rounded overflow-hidden`}>
      <div className={'w-full space-y-3'}>
        <div className='flex space-x-2'>
          <div className='flex-wrap flex space-x-4'>
            <Link
              title={`view in sandbox ${url}`}
              className={styles.title}
              href={`/website-details?websiteUrl=${encodeURIComponent(url)}`}
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

      <div className={[styles.row, 'flex-wrap py-1'].join(' ')}>
        <AccessibilityBox adaScore={adaScore} />
        <PagesBox count={subDomains?.length} />
        <LoadTimeBox
          durationFormated={pageLoadTime?.durationFormated}
          duration={pageLoadTime?.duration}
        />
        <CDNBox cdnConnected={cdnConnected} />
        <HeadersBox pageHeaders={pageHeaders} />
        <LighthouseBox pageInsights={pageInsights} />
        <OnlineBox online={online} />
      </div>

      <div className={styles.spacing} />
      <div className={styles.spacing} />
      <div className={styles.metaBlock}>
        <InfoBlock
          title={'Custom CDN'}
          titleButton={
            <div className='flex'>
              <input
                checked={isCdnMinified}
                type='checkbox'
                onChange={() => setMinified((minified: boolean) => !minified)}
                className={classNames(
                  'outline-none relative inline-flex flex-shrink-0 h-5 w-10 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                )}
              ></input>
              <span className='text-sm font-medium ml-3'>MINIFIED</span>
            </div>
          }
        >
          <PrismLight
            language='html'
            style={prismStyles}
            onClick={copyClipboard}
            className={
              'hover:bg-blue-500 hover:text-white color-black cursor-pointer'
            }
          >
            {script?.cdnUrl
              ? `<script src="${
                  isCdnMinified ? cdnUrlMinifed : cdnUrl
                }"></script>`
              : 'N/A'}
          </PrismLight>
        </InfoBlock>

        {domain ? (
          <InfoBlock
            title={'Status Badge'}
            titleButton={
              <div className='flex'>
                <input
                  checked={isMarkdown}
                  type='checkbox'
                  onChange={() => setMarkdown((minified: boolean) => !minified)}
                  className={classNames(
                    'outline-none relative inline-flex flex-shrink-0 h-5 w-10 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  )}
                ></input>
                <span className='text-sm font-medium ml-3'>MARKDOWN</span>
              </div>
            }
          >
            <PrismLight
              language={statusBadgeLanguage}
              style={prismStyles}
              onClick={copyClipboard}
              className={'hover:bg-blue-500 hover:text-white cursor-pointer'}
            >
              {statusBadgeLanguage === 'markdown'
                ? `[![A11yWatch](${statusBadgeUrl})](${reportsLink})`
                : `<a href="${reportsLink}"><img src="${statusBadgeUrl}" /></a>`}
            </PrismLight>

            <div className='py-3'>
              <Link href={reportsLink}>
                <img
                  src={statusBadgeUrl}
                  alt={`Status badge for ${domain}`}
                  width={112}
                  height={20}
                />
              </Link>
            </div>
          </InfoBlock>
        ) : null}
      </div>
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

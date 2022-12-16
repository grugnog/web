import React, {
  useState,
  useMemo,
  useCallback,
  memo,
  useDeferredValue,
} from 'react'
import { MoreOptions } from '@app/components/general/cells/menu/more'
import { Link } from '../link'
import { WebsiteSecondary } from './render'
import {
  SCRIPTS_CDN_URL_HOST,
  BASE_GQL_URL,
  STATUS_URL,
} from '@app/configs/app-config'

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
import { useWasmContext } from '@app/components/providers'
import { useAuthContext } from '@app/components/providers/auth'
import { GrChannel, GrValidate } from 'react-icons/gr'
import { Lighthouse } from '../lighthouse'
import { fetcher } from '@app/utils/fetcher'

const styles = {
  title: 'text-xl md:text-3xl font-bold truncate text-gray-600',
  spacing: 'py-2',
  row: 'flex flex-1',
  metaBlock: 'px-2 py-1 border',
}

const notAvail = 'Not available on a Free plan.'
const ppr = '[Paid plan required]'

// TODO: add types
export function WebsiteCellDashboardComponent({
  url,
  removePress,
  handleClickOpen,
  pages,
  handleClickOpenPlayer,
  issues: currentIssues,
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
  actionsEnabled,
  robots,
  subdomains,
  tld,
  shutdown,
  verified,
}: any) {
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const { account } = useAuthContext() // TODO: move to provider top level
  const { feed } = useWasmContext()
  const items = useDeferredValue(
    feed?.get_data_item(domain, tld || subdomains) ?? []
  )

  const issues = items?.length ? items : currentIssues
  const { activeSubscription } = account

  const handleMenu = useCallback(
    (event: React.SyntheticEvent<HTMLButtonElement>) => {
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

  const handleMainClick =
    (eventData?: any, title?: string, mini?: boolean, url?: string) =>
    async () => {
      // mini player open - small modal with dynamic content
      let eventDS = eventData

      if (title === 'Verify DNS') {
        eventDS =
          url &&
          (await fetcher(
            '/website/dns',
            { domain: new URL(url).hostname },
            'POST'
          ))
      }

      if (mini) {
        handleClickOpenPlayer(true, eventDS, title)()
      } else if (handleClickOpen) {
        handleClickOpen(eventDS, title, url)
      }

      setAnchorEl(null)
    }

  // real time issue tracking todo: send subscription with issuesInfo
  const { errorCount, warningCount, totalIssues, issuesFixedByCdn } =
    useMemo(() => {
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

  const {
    statusBadgeUrl,
    reportsLink,
    reportsPageLink,
    linkUrl,
    linkView,
    domainHost,
  } = useMemo(() => {
    // TODO: REMOVE ALL URL CLIENT APPENDING
    const encodedUrl = encodeURIComponent(url)
    const statusBadgeUrl = `${STATUS_URL}/${encodeURIComponent(domain)}`

    const reportsLink = `${BASE_GQL_URL}/${encodedUrl}`
    const reportsPageLink = `/reports/${encodedUrl}`
    // hostname should always be valid - ignore try catching
    const hostname = url && new URL(url).hostname

    return {
      domainHost: hostname,
      statusBadgeUrl,
      encodedUrl,
      reportsLink,
      reportsPageLink,
      linkUrl: `/website-details?url=${encodedUrl}`,
      linkView: `/web-view?url=${encodedUrl}`,
    }
  }, [domain, url])

  const pageIssueCount =
    issues?.length > issuesInfo?.pageCount
      ? issues.length
      : issuesInfo?.pageCount

  const { adaScoreAverage: adaScore } = issuesInfo ?? {}

  const cdnBase =
    script?.cdnUrl ?? `${domain}/${domain.replace(/\./g, '-')}-ada-fix-0.js`
  const cdnBaseMin =
    script?.cdnUrlMinified ??
    `${domain}/${domain.replace(/\./g, '-')}-ada-fix-0.min.js`

  const cdnUrl = cdnBase ? `${SCRIPTS_CDN_URL_HOST}/${cdnBase}` : notAvail
  const cdnUrlMinifed = cdnBaseMin
    ? `${SCRIPTS_CDN_URL_HOST}/${cdnBaseMin}`
    : notAvail

  return (
    <li
      className={`rounded bg-white border-4 overflow-hidden${
        shutdown ? ' bg-yellow-50' : ''
      }`}
    >
      <div>
        <div className='flex gap-x-1 place-items-center place-content-between border-b px-3 pt-2 pb-4'>
          <div className='flex gap-3 place-items-center flex-wrap'>
            <div>
              <div
                className={`${styles.title} flex space-x-2 place-items-center pb-2`}
              >
                <Link
                  title={`view details ${url}`}
                  href={linkView}
                  className={styles.title}
                >
                  {domainHost}
                </Link>
                {verified ? (
                  <GrValidate
                    className='grIcon text-sm'
                    title={`${url} is verified.`}
                  />
                ) : null}
              </div>
              <WebsiteSecondary
                domain={domain}
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
                robots={robots}
                subdomains={subdomains}
                tld={tld}
                shutdown={shutdown}
                dashboard
              />
            </div>
            <div className='flex place-items-center px-2 space-x-3'>
              <Link
                title={`view in sandbox ${url}`}
                href={linkUrl}
                className={'hover:bg-gray-200 p-2 rounded'}
              >
                <GrChannel />
              </Link>
              <div className='pl-1 border-l'>
                <div className='pl-3'>
                  <Timer stop={!activeCrawl} duration={crawlDuration} />
                </div>
              </div>
            </div>
          </div>
          <MoreOptions
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
            subdomains={subdomains}
            tld={tld}
            pageInsights={pageInsights}
            shutdown={shutdown}
            verified={verified}
          />
        </div>
      </div>
      <div className='space-y-1'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-1'>
          <AccessibilityBox adaScore={adaScore} />
          <IssuesBox issues={errorCount} />
          <WarningsBox issues={warningCount} />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-1'>
          <CdnFixBox issues={issuesFixedByCdn} />
          <PagesBox count={pageIssueCount ?? 'N/A'} />
          <LoadTimeBox duration={pageLoadTime?.duration} />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-1'>
          <StandardBox standard={standard} url={url} />
          <HeadersBox pageHeaders={pageHeaders} />
          <LighthouseBox pageInsights={pageInsights} />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-1'>
          <UserAgentBox ua={ua} url={url} />
          <ActionsBox actions={actionsEnabled || actions?.length} />
          <OnlineBox online={online} />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-1'>
          <CustomCDNBox
            cdnUrl={activeSubscription ? cdnUrl : ppr}
            cdnUrlMinifed={activeSubscription ? cdnUrlMinifed : ppr}
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
      </div>
      {pageInsights && insight && lighthouseVisible ? (
        <Lighthouse insight={insight} lighthouseVisible={lighthouseVisible} />
      ) : null}
    </li>
  )
}

export const WebsiteCellDashboard = memo(WebsiteCellDashboardComponent)

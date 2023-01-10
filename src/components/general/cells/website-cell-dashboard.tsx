import React, { useMemo, useCallback, useDeferredValue } from 'react'
import { MoreOptions } from '@app/components/general/cells/menu/more'
import { Link } from '../link'
import { WebsiteSecondary } from './render'
import { BASE_GQL_URL, STATUS_URL } from '@app/configs/app-config'

import {
  AccessibilityBox,
  PagesBox,
  LoadTimeBox,
  HeadersBox,
  LighthouseBox,
  StatusBadgeBox,
  CustomCDNBox,
  StandardBox,
  IssuesBox,
  WarningsBox,
} from './blocks'
import { MobileBox } from './blocks/mobile'
import { Issue, Website } from '@app/types'
import { Timer } from '../timer'
import { UserAgentBox } from './blocks/user-agent'
import { ActionsBox } from './blocks/actions'
import { CdnFixBox } from './blocks/cdn-fix'
import { useWasmContext } from '@app/components/providers'
import { useAuthContext } from '@app/components/providers/auth'
import {
  GrChannel,
  GrStatusWarningSmall,
  GrSync,
  GrValidate,
} from 'react-icons/gr'
import { fetcher } from '@app/utils/fetcher'
import { AppManager, HomeManager } from '@app/managers'
import { useInteractiveContext } from '@app/components/providers/interactive'
import { IssueCard } from './card/issue-card'
import { AnalyticsCard } from './card/analytics-card'
import { LighthouseCard } from './card/lighthouse-card'
import { TLDBox } from './blocks/tld'
import { SubDomainsBox } from './blocks/subdomains'
import { RobotsBox } from './blocks/robots'
import { useWebsiteLiveData } from '@app/data/formatters/use-live-data'
import { RunnersBox } from './blocks/runner'

const styles = {
  title: 'text-xl md:text-3xl font-bold truncate',
  spacing: 'py-2',
  row: 'flex flex-1',
  metaBlock: 'px-2 py-1 border',
}

interface WebsiteCellProps {
  index: number
  crawlWebsite(x: any): Promise<any>
  removePress(x: any): Promise<any>
  crawlDuration?: number
  lighthouseVisible?: boolean
  activeCrawl?: Record<string, unknown>
  handleClickOpen(data: any, title: any, url: any, error: any): void
  url: string
  pageHeaders?: any
}

// main dashboard cell with details and paginated views
export function WebsiteCellDashboard({
  url,
  removePress,
  handleClickOpen,
  pages,
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
  runners,
}: Website & WebsiteCellProps) {
  const { account } = useAuthContext() // TODO: move to provider top level
  const { feed } = useWasmContext()
  const items: Issue[] = useDeferredValue(
    feed?.get_data_item(domain, !!(tld || subdomains)) ?? []
  )
  const { setSelectedWebsite, selectedWebsite } = useInteractiveContext()
  const issues = items.length ? items : currentIssues
  const { activeSubscription } = account

  // real time issue tracking todo: send subscription with issuesInfo [todo: build analytics feed usage]
  const { errorCount, warningCount, totalIssues, issuesFixedByCdn, liveData } =
    useWebsiteLiveData({ issues, issuesInfo })

  const onRemovePress = useCallback(async () => {
    if (url === selectedWebsite) {
      HomeManager.setDashboardView('')
      setSelectedWebsite('')
    }
    try {
      await removePress({
        variables: {
          url,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }, [url, removePress, selectedWebsite, setSelectedWebsite])

  const handleMainClick =
    (eventData?: any, title?: string, _mini?: boolean, url?: string) =>
    async () => {
      // mini player open - small modal with dynamic content
      let eventDS = eventData

      // todo: open modal and set loading afterwards
      if (title === 'Verify DNS' && url) {
        eventDS = await fetcher(
          '/website/dns',
          { domain: new URL(url).hostname },
          'POST'
        )
      }
      if (title === 'Website Analytics') {
        const path = url
          ? `/list/analytics?limit=10000&domain=${new URL(url).hostname}`
          : '/list/website?=limit=50'
        eventDS = await fetcher(path, null, 'GET')
      }

      if (handleClickOpen) {
        handleClickOpen(eventDS, title, url, null)
      }
    }

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

  const pagecount = issuesInfo?.pageCount || 0
  const issueTotal = issuesInfo?.totalIssues || 0

  const pageIssueCount =
    issues && Array.isArray(issues) && issues.length > pagecount
      ? issues.length
      : pagecount

  const { adaScoreAverage: adaScore } = issuesInfo ?? {}

  const onWebsiteCrawl = useCallback(async () => {
    AppManager.toggleSnack(
      true,
      `Scan in progress, you’ll be notified if new issues occur.`,
      'message'
    )
    try {
      await crawlWebsite({
        variables: {
          url,
        },
      })
    } catch (e) {}
  }, [url, crawlWebsite])

  return (
    <li>
      <div className={`${index ? 'border-t' : ''}`}>
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
                    className={`${styles.title} p-0`}
                  >
                    {domainHost}
                  </Link>
                  {shutdown ? (
                    <GrStatusWarningSmall
                      className={`grIcon text-xs`}
                      title={'Crawl did not complete.'}
                    />
                  ) : null}
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
                      totalIssues > issueTotal ? totalIssues : issueTotal,
                  }}
                  pageIssueCount={pageIssueCount}
                  cdnConnected={cdnConnected}
                  adaScore={adaScore}
                  pageLoadTime={pageLoadTime}
                  lastScanDate={lastScanDate}
                  pageHeaders={pageHeaders}
                  robots={robots}
                  subdomains={subdomains}
                  tld={tld}
                  shutdown={shutdown}
                  dashboard
                  online={online}
                />
              </div>
              <div className='flex place-items-center px-2 space-x-3'>
                <button
                  title={`sync and check ${url} for issues`}
                  className={'hover:opacity-70 p-2 rounded'}
                  onClick={onWebsiteCrawl}
                >
                  <GrSync className='grIcon' />
                </button>
                <Link
                  title={`view in sandbox ${url}`}
                  href={linkUrl}
                  className={'hover:opacity-70 p-2 rounded'}
                >
                  <GrChannel className='grIcon' />
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
              crawlWebsite={onWebsiteCrawl}
              handleMainClick={handleMainClick}
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

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1'>
          <AccessibilityBox adaScore={adaScore} />
          <IssuesBox issues={errorCount} />
          <WarningsBox issues={warningCount} />
          <CdnFixBox issues={issuesFixedByCdn} />
          <PagesBox count={pageIssueCount ?? 'N/A'} />
          <LoadTimeBox duration={pageLoadTime?.duration} />
          <HeadersBox pageHeaders={pageHeaders} />
          <LighthouseBox pageInsights={pageInsights} />
          <ActionsBox actions={actionsEnabled && actions?.length} />
          <RunnersBox url={url} runners={runners} />
          {/* <OnlineBox online={online} /> */}
          <UserAgentBox ua={ua} url={url} />
          <StandardBox standard={standard} url={url} />
          <RobotsBox robots={robots} url={url} />
          <MobileBox mobile={mobile} url={url} />
          <TLDBox
            tld={tld}
            url={url}
            activeSubscription={account.activeSubscription}
          />
          <SubDomainsBox
            subdomains={subdomains}
            url={url}
            activeSubscription={account.activeSubscription}
          />
          <CustomCDNBox
            cdnConnected={cdnConnected}
            script={script}
            activeSubscription={activeSubscription}
            domain={domain}
          />
          <StatusBadgeBox
            reportsLink={reportsLink}
            statusBadgeUrl={statusBadgeUrl}
            domain={domain}
            reportsPageLink={reportsPageLink}
            hideBadge
          />
        </div>
        {issuesInfo || liveData.length ? (
          <AnalyticsCard domain={domain} liveData={liveData} />
        ) : null}
        <LighthouseCard
          lighthouseVisible={pageInsights && insight && lighthouseVisible}
          insight={insight}
        />
        {issuesInfo || liveData.length ? (
          <IssueCard pageUrl={url} liveData={liveData} />
        ) : null}
      </div>
    </li>
  )
}

import React from 'react'
import { WebsiteCellDashboard } from '@app/components/general/cells'
import { Website } from '@app/types'
import { domainName } from '@app/lib/domain'

// wrapper to memo feed item to cell
const DashboardCellWrapper = (props: any) => {
  const { domain, _id, issues, ...extra } = props

  return (
    <WebsiteCellDashboard
      _id={_id}
      domain={domain}
      {...extra}
      issues={issues}
    />
  )
}

// Iterate over website dashboard cells
export function WebSitesDashboard({
  data,
  removePress,
  handleClickOpen,
  refetch,
  handleClickOpenPlayer,
  crawlWebsite,
  setModal,
  mutatationLoading,
  loading,
  lighthouseVisible,
  issueFeed,
  activeCrawls,
}: any) {
  const { data: feed } = issueFeed ?? { data: null }

  const feedKeys = feed && Object.keys(feed)

  return (
    <>
      {data?.map(
        (
          { url, domain, _id, tld, subdomains, ...props }: Website,
          index: number
        ) => {
          const activeCrawl = activeCrawls && activeCrawls[domain]

          const feedItem =
            feed && domain in feed
              ? feed[domain]
              : {
                  [domain]: {},
                }

          const captureAll = tld || subdomains

          if (captureAll) {
            for (const key of feedKeys) {
              if (domainName(key) === domainName(domain)) {
                for (const item in feed[key]) {
                  feedItem[item] = feed[key][item]
                }
              }
            }
          }

          let items = []

          if (feedItem) {
            items = Object.keys(feedItem)
              ?.map((ke: any) => {
                if (Object.keys(feedItem[ke]).length) {
                  return feedItem[ke]
                }
                return false
              })
              .filter(Boolean)
          }

          return (
            <DashboardCellWrapper
              feed={feed}
              key={_id}
              _id={_id}
              issues={items}
              domain={domain}
              handleClickOpen={handleClickOpen}
              url={url}
              removePress={removePress}
              refetch={refetch}
              handleClickOpenPlayer={handleClickOpenPlayer}
              crawlWebsite={crawlWebsite}
              setModal={setModal}
              loading={loading}
              mutatationLoading={mutatationLoading}
              index={index}
              activeCrawl={activeCrawl}
              lighthouseVisible={lighthouseVisible}
              {...props}
            />
          )
        }
      )}
    </>
  )
}

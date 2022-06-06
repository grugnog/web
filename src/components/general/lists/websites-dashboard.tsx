import React from 'react'
import { WebsiteCellDashboard } from '@app/components/general/cells'
import { Website } from '@app/types'

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

  return (
    <>
      {data?.map(({ url, domain, _id, ...props }: Website, index: number) => {
        const activeCrawl = activeCrawls && activeCrawls[domain]

        let feedItem: any = {}
        let items = []

        if (feed && feed[domain + '']) {
          feedItem = feed[domain + '']
        }

        if (feedItem) {
          items = Object.keys(feedItem)?.map((ke: any) => feedItem[ke])
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
      })}
    </>
  )
}

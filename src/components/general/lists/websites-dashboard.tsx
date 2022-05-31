import React, { useMemo } from 'react'
import { WebsiteCellDashboard } from '@app/components/general/cells'
import { Website } from '@app/types'

// wrapper to memo feed item to cell
const DashboardCellWrapper = (props: any) => {
  const { feed, domain, _id, ...extra } = props

  const issues = useMemo(() => {
    let feedItem: any = {}
    let items = []

    if (feed && feed[domain + '']) {
      feedItem = feed[domain + '']
    }

    if (feedItem) {
      items = Object.keys(feedItem)?.map((ke: any) => feedItem[ke])
    }

    return items
  }, [feed, domain])

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
}: any) {
  const { data: feed } = issueFeed ?? { data: null }

  return (
    <>
      {data?.map(({ url, domain, _id, ...props }: Website, index: number) => {
        return (
          <DashboardCellWrapper
            feed={feed}
            key={_id}
            _id={_id}
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
            lighthouseVisible={lighthouseVisible}
            {...props}
          />
        )
      })}
    </>
  )
}

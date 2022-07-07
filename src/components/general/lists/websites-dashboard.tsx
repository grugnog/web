import React from 'react'
import { WebsiteCellDashboard } from '@app/components/general/cells'
import { Website } from '@app/types'

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
  activeCrawls,
}: any) {
  return (
    <ul className='space-y-2 py-2'>
      {data?.map(({ url, domain, _id, ...props }: Website, index: number) => {
        const activeCrawl = activeCrawls && activeCrawls[domain]

        return (
          <WebsiteCellDashboard
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
            activeCrawl={activeCrawl}
            lighthouseVisible={lighthouseVisible}
            {...props}
          />
        )
      })}
    </ul>
  )
}

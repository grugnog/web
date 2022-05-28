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
}: any) {
  return (
    <>
      {data?.map(({ url, _id, ...props }: Website, index: number) => (
        <WebsiteCellDashboard
          key={_id}
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
      ))}
    </>
  )
}

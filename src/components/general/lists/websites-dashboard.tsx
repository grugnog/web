import React from 'react'
import { WebsiteCellDashboard } from '@app/components/general/cells'

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
      {data?.map(({ url, id, pageUrl, ...props }: any, index: number) => (
        <WebsiteCellDashboard
          handleClickOpen={handleClickOpen}
          url={url || pageUrl}
          key={`${id}-${url || pageUrl}`}
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

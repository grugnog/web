import { Fragment } from 'react'
import { WebsiteCellDashboard } from '@app/components/general/cells'
import { Website } from '@app/types'
import { listStyle } from '@app/styles/lists/tw'

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
  children,
}: any) {
  if (!data?.length) {
    return (
      <Fragment>
        <div className='text-gray-800 text-base'>No websites exist</div>
      </Fragment>
    )
  }

  return (
    <ul className={listStyle}>
      {data?.map((props: Website, index: number) => (
        <WebsiteCellDashboard
          key={props._id}
          handleClickOpen={handleClickOpen}
          removePress={removePress}
          refetch={refetch}
          handleClickOpenPlayer={handleClickOpenPlayer}
          crawlWebsite={crawlWebsite}
          setModal={setModal}
          loading={loading}
          mutatationLoading={mutatationLoading}
          lighthouseVisible={lighthouseVisible}
          activeCrawl={activeCrawls && activeCrawls[props.domain]}
          index={index}
          {...props}
        />
      ))}
      {children}
    </ul>
  )
}

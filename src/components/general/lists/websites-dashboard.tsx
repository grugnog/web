import { Fragment } from 'react'
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
  if (!data?.length) {
    return (
      <Fragment>
        <div>No websites exist</div>
      </Fragment>
    )
  }

  return (
    <ul className='space-y-2 py-2'>
      {data?.map((props: Website, index: number) => {
        const activeCrawl = activeCrawls && activeCrawls[props.domain]

        return (
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
            activeCrawl={activeCrawl}
            index={index}
            {...props}
          />
        )
      })}
    </ul>
  )
}

import { FC, Fragment, PropsWithChildren } from 'react'
import { WebsiteCellDashboard } from '@app/components/general/cells'
import { Website } from '@app/types'
import { listStyle } from '@app/styles/lists/tw'

export interface WebsiteListProps {
  data?: any[]
  error?: any
  loading?: boolean
  mutatationLoading?: boolean
  lighthouseVisible?: boolean
  activeCrawls?: Record<string, any>
  emptyHeaderTitle?: string
  emptyHeaderSubTitle?: string
  removePress?(x: any): void
  refetch(_: any): Promise<any>
  crawlWebsite(x: any): void
  setModal(x: any): void
}

interface WebsiteDashboardProps extends WebsiteListProps {
  handleClickOpen(data: any, title: any, url: any, error: any): void
  // todo remove curry
  handleClickOpenPlayer: (
    open?: boolean,
    data?: any,
    title?: string
  ) => () => void
}

// Iterate over website dashboard cells
export const WebSitesDashboard: FC<
  PropsWithChildren<WebsiteDashboardProps>
> = ({
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
}) => {
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

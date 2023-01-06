import { FC, Fragment, memo, PropsWithChildren } from 'react'
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
  removePress(x: any): Promise<any>
  refetch(_: any): Promise<any>
  crawlWebsite(x: any): Promise<any>
  setModal(x: any): void
}

interface WebsiteDashboardProps extends WebsiteListProps {
  handleClickOpen(data: any, title: any, url: any, error: any): void
}

// Iterate over website dashboard cells
export const WebSitesDashboardComponent: FC<
  PropsWithChildren<WebsiteDashboardProps>
> = ({
  data,
  removePress,
  handleClickOpen,
  crawlWebsite,
  lighthouseVisible,
  activeCrawls,
  children,
}) => {
  if (!data?.length) {
    return (
      <Fragment>
        <div className=' text-base'>No websites exist</div>
      </Fragment>
    )
  }

  return (
    <ul className={`${listStyle} bg-[rgb(246,246,249)] dark:bg-black`}>
      {data?.map((props: Website, index: number) => (
        <WebsiteCellDashboard
          key={props._id}
          handleClickOpen={handleClickOpen}
          removePress={removePress}
          crawlWebsite={crawlWebsite}
          lighthouseVisible={lighthouseVisible}
          activeCrawl={activeCrawls && activeCrawls[props.domain]}
          index={index}
          url={props.url as string}
          {...props}
        />
      ))}
      {children}
    </ul>
  )
}

export const WebSitesDashboard = memo(WebSitesDashboardComponent)

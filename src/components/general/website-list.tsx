import { Fragment, useState, useCallback, FC, PropsWithChildren } from 'react'
import { FullScreenModal } from './fullscreen-modal'
import { DataContainer } from './data-container'
import {
  WebsiteListProps,
  WebSitesDashboard,
} from '@app/components/general/lists/websites-dashboard'

const defaultModalState = {
  open: false,
  data: null,
  title: '',
  url: '',
  error: '',
}

// returns a list of websites with top level modal for displaying issues.
export const WebsiteList: FC<PropsWithChildren<WebsiteListProps>> = ({
  data,
  error,
  loading,
  removePress,
  emptyHeaderTitle = 'Empty',
  emptyHeaderSubTitle = 'Add your website below',
  refetch,
  crawlWebsite,
  setModal,
  mutatationLoading,
  lighthouseVisible,
  activeCrawls,
  children,
}) => {
  const [modal, setOpen] = useState(defaultModalState)

  const handleClickOpen = useCallback(
    (data: any, title: any, url: any, er: any) => {
      setOpen({ open: true, data, title, url, error: er })
    },
    [setOpen]
  )

  const handleClose = useCallback(() => {
    setOpen((m) => ({ ...m, open: false }))
  }, [setOpen])

  return (
    <Fragment>
      <DataContainer
        avatar={false}
        dashboard
        emptyHeaderTitle={emptyHeaderTitle}
        emptyHeaderSubTitle={emptyHeaderSubTitle}
        data={data}
        loading={loading}
        error={error}
      >
        <WebSitesDashboard
          handleClickOpen={handleClickOpen}
          refetch={refetch}
          removePress={removePress}
          crawlWebsite={crawlWebsite}
          setModal={setModal}
          loading={loading}
          data={data}
          mutatationLoading={mutatationLoading}
          lighthouseVisible={lighthouseVisible}
          activeCrawls={activeCrawls}
        >
          {children}
        </WebSitesDashboard>
      </DataContainer>
      <FullScreenModal
        {...modal}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        refetch={refetch}
      />
    </Fragment>
  )
}

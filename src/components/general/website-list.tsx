import React, { Fragment, useState, useCallback } from 'react'
import { useMiniPlayer } from '@app/data'
import { FullScreenModal } from './fullscreen-modal'
import { DataContainer } from './data-container'
import { WebSitesDashboard } from '@app/components/general/lists/websites-dashboard'

const defaultModalState = {
  open: false,
  data: null,
  title: '',
  url: '',
  error: '',
}

// returns a list of websites with top level modal for displaying issues.
export function WebsiteList({
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
}: any) {
  const [modal, setOpen] = useState(defaultModalState)
  const { setMiniPlayerContent } = useMiniPlayer(setOpen)

  const handleClickOpen = useCallback(
    (data: any, title: any, url: any, error: any) => {
      setOpen({ open: true, data, title, url, error })
    },
    [setOpen]
  )

  const handleClose = useCallback(() => {
    setOpen((m) => ({ ...m, open: false }))
  }, [setOpen])

  // shared props between data container and main component
  const sharedProps = {
    data,
    error,
    loading,
    removePress,
    emptyHeaderTitle,
    emptyHeaderSubTitle,
  }

  // website primary props
  const websiteProps = {
    handleClickOpen,
    handleClickOpenPlayer: setMiniPlayerContent,
    refetch,
    crawlWebsite,
    setModal,
    mutatationLoading,
    lighthouseVisible,
    activeCrawls,
  }

  return (
    <Fragment>
      <DataContainer {...sharedProps}>
        <WebSitesDashboard {...sharedProps} {...websiteProps} />
      </DataContainer>
      <FullScreenModal
        {...modal}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        refetch={refetch}
        handleClickOpenPlayer={setMiniPlayerContent}
      />
    </Fragment>
  )
}

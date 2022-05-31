import React, { Fragment, useState, useCallback } from 'react'
import { useMiniPlayer } from '@app/data'
import { RenderInner } from '@app/components/general/cells/render/website-inner'
import { FullScreenModal } from './fullscreen-modal'

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
  issueFeed,
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

  return (
    <Fragment>
      <RenderInner
        {...{
          handleClickOpen: handleClickOpen,
          handleClickOpenPlayer: setMiniPlayerContent,
          data,
          error,
          loading,
          removePress,
          emptyHeaderTitle,
          emptyHeaderSubTitle,
          refetch,
          crawlWebsite,
          setModal,
          mutatationLoading,
          lighthouseVisible,
          issueFeed,
        }}
      />
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

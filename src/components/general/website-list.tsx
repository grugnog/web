import React, { Fragment, useState, useEffect, useCallback } from 'react'
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
}: any) {
  const [modal, setOpen] = useState(defaultModalState)
  const { miniPlayer, setMiniPlayerContent } = useMiniPlayer()

  const handleClickOpen = useCallback(
    (data: any, title: any, url: any, error: any) => {
      setOpen({ open: true, data, title, url, error })
    },
    [setOpen]
  )

  const handleClose = useCallback(() => {
    setOpen((m) => ({ ...m, open: false }))
  }, [setOpen])

  useEffect(() => {
    if (miniPlayer.open) {
      handleClose()
    }
  }, [miniPlayer, handleClose])

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

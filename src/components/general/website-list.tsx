/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { Fragment, FC, useState, useEffect, useCallback } from 'react'
import { List as MUList, CardHeader } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useMiniPlayer } from '@app/data'
import { ListSkeleton } from '../placeholders'
import { FullScreenModal } from './fullscreen-modal'
import { WebsiteCellDashboard as RenderWebsite } from './cells'
import { FormDialog } from '.'

const useStyles = makeStyles(() => ({
  empty: {
    minHeight: 88,
  },
}))

function WebSites({
  data,
  removePress,
  handleClickOpen,
  refetch,
  handleClickOpenPlayer,
  crawlWebsite,
  setModal,
  mutatationLoading,
  loading,
}: any) {
  return data?.map(
    ({ url, id, pageHeaders, pageUrl, ...domainProps }: any, index: number) => (
      <RenderWebsite
        handleClickOpen={handleClickOpen}
        url={url || pageUrl}
        key={`${id} ${url} ${pageUrl} ${index}`}
        removePress={removePress}
        refetch={refetch}
        handleClickOpenPlayer={handleClickOpenPlayer}
        crawlWebsite={crawlWebsite}
        setModal={setModal}
        loading={loading}
        mutatationLoading={mutatationLoading}
        pageHeaders={pageHeaders}
        index={index}
        {...domainProps}
      />
    )
  )
}

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
}: any) {
  const classes = useStyles()
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

  const RenderInner: FC = () => {
    if (!data?.length && loading) {
      return <ListSkeleton />
    }
    if (!data.length && !loading && error) {
      return (
        <CardHeader
          title='Error'
          subheader='An Issue occured. Please try again. If issue persist please contact support.'
          className={classes.empty}
        />
      )
    }

    if (data?.length) {
      return (
        <MUList>
          <WebSites
            data={data}
            {...{
              handleClickOpen,
              handleClickOpenPlayer: setMiniPlayerContent,
              removePress,
              refetch,
              crawlWebsite,
              setModal,
              mutatationLoading: mutatationLoading,
            }}
          />
        </MUList>
      )
    }

    return (
      <div
        className={
          'flex flex-col w-full place-items-center py-10 my-2 text-center'
        }
      >
        <CardHeader
          title={emptyHeaderTitle}
          subheader={emptyHeaderSubTitle}
          className={classes.empty}
        />
        <FormDialog />
      </div>
    )
  }

  return (
    <Fragment>
      <RenderInner />
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

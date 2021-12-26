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
import { WebsiteCellDashboard } from './cells'
import { FormDialog } from '.'
import Image from 'next/image'

const useStyles = makeStyles(() => ({
  empty: {
    minHeight: 88,
  },
}))

const infoDetails = [
  {
    title: 'Detailed information',
    subTitle:
      'Get spot on details on how to improve your website in various areas. Stay up to date on the latest guidelines and more as they come out.',
  },
  {
    title: 'Safe Guard',
    subTitle: `Include your custom CDN at no cost and make sure issues are fixed upfront. Sometimes accidents happens thats why we got your back.`,
  },
  {
    title: 'Alerts',
    subTitle:
      'Get alerted when your page encounters new issues at any frequency.',
  },
]

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
    ({ url, id, pageHeaders, pageUrl, ...props }: any, index: number) => (
      <WebsiteCellDashboard
        handleClickOpen={handleClickOpen}
        url={url || pageUrl}
        key={`${id}-${url || pageUrl}-${index}`}
        removePress={removePress}
        refetch={refetch}
        handleClickOpenPlayer={handleClickOpenPlayer}
        crawlWebsite={crawlWebsite}
        setModal={setModal}
        loading={loading}
        mutatationLoading={mutatationLoading}
        pageHeaders={pageHeaders}
        index={index}
        {...props}
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
          titleTypographyProps={{ style: { fontSize: '3.1rem' } }}
        />
        <FormDialog />
        <div className={'flex space-items-center space-x-10 py-10'}>
          <ul className={'w-full text-left space-y-2 md:w-1/2 md:pr-20'}>
            {infoDetails.map(
              (detail: { title: string; subTitle: string }, i: number) => {
                return (
                  <li key={i}>
                    <div className={'text-3xl font-semibold'}>
                      {detail.title}
                    </div>
                    <div className={'text-xl'}>{detail.subTitle}</div>
                  </li>
                )
              }
            )}
          </ul>
          <div className={'hidden md:block'}>
            <Image
              src={'/static/img/website_builder.svg'}
              height={540}
              width={660}
              alt='Website accessibility builder'
            />
          </div>
        </div>
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

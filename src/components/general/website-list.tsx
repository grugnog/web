/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, {
  memo,
  Fragment,
  FC,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { List as MUList, CardHeader } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useMiniPlayer } from '@app/data'
import { ListSkeleton } from '../placeholders'
import { FullScreenModal } from './fullscreen-modal'
import { WebsiteCellDashboard } from './cells'
import { EmptyWebsiteForm } from './website/empty-form'

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
  return data?.map(({ url, id, pageUrl, ...props }: any, index: number) => (
    <WebsiteCellDashboard
      handleClickOpen={handleClickOpen}
      url={url || pageUrl}
      key={`${id}-${url || pageUrl}`}
      removePress={removePress}
      refetch={refetch}
      handleClickOpenPlayer={handleClickOpenPlayer}
      crawlWebsite={crawlWebsite}
      setModal={setModal}
      loading={loading}
      mutatationLoading={mutatationLoading}
      index={index}
      {...props}
    />
  ))
}

const defaultModalState = {
  open: false,
  data: null,
  title: '',
  url: '',
  error: '',
}

const RenderInnerComponent: FC<any> = ({
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
  handleClickOpen,
  setMiniPlayerContent,
}) => {
  const classes = useStyles()

  if (!data.length) {
    if (loading) {
      return <ListSkeleton />
    }
    if (!loading && error) {
      return (
        <CardHeader
          title='Error'
          subheader='An Issue occured. Please try again. If issue persist please contact support.'
          className={classes.empty}
        />
      )
    }
    return (
      <EmptyWebsiteForm
        title={emptyHeaderTitle}
        subheader={emptyHeaderSubTitle}
        infoDetails={infoDetails}
      />
    )
  }

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

const RenderInner = memo(RenderInnerComponent)

export function WebsiteListComponent({
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

export const WebsiteList = memo(WebsiteListComponent)

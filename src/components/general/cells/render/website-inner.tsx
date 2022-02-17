/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { FC } from 'react'
import { List as MUList, CardHeader } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { ListSkeleton } from '@app/components/placeholders'
import { WebSitesDashboard } from '@app/components/general/lists/websites-dashboard'
import { EmptyWebsiteForm } from '@app/components/general/website/empty-form'

const useStyles = makeStyles(() => ({
  empty: {
    minHeight: 88,
  },
}))

export const RenderInner: FC<any> = ({
  data,
  error,
  loading,
  removePress,
  emptyHeaderTitle,
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
        emptyHeaderTitle={emptyHeaderTitle}
        emptyHeaderSubTitle={emptyHeaderSubTitle}
      />
    )
  }

  return (
    <MUList>
      <WebSitesDashboard
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

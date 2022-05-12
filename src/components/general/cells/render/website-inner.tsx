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
  handleClickOpenPlayer,
  lighthouseVisible,
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
          handleClickOpenPlayer,
          removePress,
          refetch,
          crawlWebsite,
          setModal,
          mutatationLoading: mutatationLoading,
          lighthouseVisible,
        }}
      />
    </MUList>
  )
}

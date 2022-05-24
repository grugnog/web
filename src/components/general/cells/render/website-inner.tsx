import React, { FC } from 'react'
import { CardHeader } from '@material-ui/core'

import { ListSkeleton } from '@app/components/placeholders'
import { WebSitesDashboard } from '@app/components/general/lists/websites-dashboard'
import { EmptyWebsiteForm } from '@app/components/general/website/empty-form'

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
  if (!data.length) {
    if (loading) {
      return <ListSkeleton />
    }
    if (!loading && error) {
      return (
        <CardHeader
          title='Error'
          subheader='An Issue occured. Please try again. If issue persist please contact support.'
          style={{ minHeight: 88 }}
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
    <ul className='space-y-2 py-2'>
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
    </ul>
  )
}

import { FC, PropsWithChildren } from 'react'
import { CardHeader } from '@material-ui/core'

import { ListSkeleton } from '@app/components/placeholders'
import { EmptyWebsiteForm } from '@app/components/general/website/empty-form'

type DataContainerProps = PropsWithChildren<{
  data?: any
  error?: boolean
  loading?: boolean
  emptyHeaderTitle?: string
  emptyHeaderSubTitle?: string
}>

// data container to handle loading main application pages
export const DataContainer: FC<DataContainerProps> = ({
  data,
  error,
  loading,
  emptyHeaderTitle,
  emptyHeaderSubTitle,
  children,
}) => {
  if (!data?.length) {
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

  return <>{children || null}</>
}

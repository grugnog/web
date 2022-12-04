import { FC, PropsWithChildren } from 'react'
import { ListSkeleton } from '@app/components/placeholders'
import { EmptyWebsiteForm } from '@app/components/general/website/empty-form'
import { CardHeader } from '@app/app/card/header'

type DataContainerProps = PropsWithChildren<{
  data?: any
  error?: boolean
  loading?: boolean
  emptyHeaderTitle?: string
  emptyHeaderSubTitle?: string
  avatar?: boolean
}>

// data container to handle loading main application pages
export const DataContainer: FC<DataContainerProps> = ({
  data,
  error,
  loading,
  emptyHeaderTitle,
  emptyHeaderSubTitle,
  children,
  avatar = true,
}) => {
  if (!data?.length) {
    if (loading) {
      return <ListSkeleton avatar={avatar} />
    }
    if (!loading && error) {
      return (
        <CardHeader
          title='Error'
          subheader='An Issue occurred. Please try again. If issue persist please contact support.'
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

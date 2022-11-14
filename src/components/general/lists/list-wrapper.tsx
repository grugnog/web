import { FC, memo } from 'react'
import { CardHeader } from '@material-ui/core'
import { ListSkeleton } from '../../placeholders'

const emptyClass = 'min-h-10'

// list wrapper to display loading and error page
const InnerWrapperComponent: FC<any> = (props) => {
  const {
    loading,
    data,
    children,
    error,
    emptyHeaderTitle,
    emptyHeaderSubTitle,
    avatar = false,
  } = props

  // Loading
  if (!data && loading) {
    return <ListSkeleton avatar={avatar} />
  }

  // ERROR PAGE to display errors ( not actual network error )
  if (!data && !loading && error) {
    return (
      <CardHeader
        title='Error'
        subheader='An Issue occured. Please try again. If issue persist please contact support.'
        className={emptyClass}
      />
    )
  }

  // render list content
  if (data) {
    return children
  }

  return (
    <CardHeader
      title={emptyHeaderTitle}
      subheader={emptyHeaderSubTitle}
      className={emptyClass}
    />
  )
}

export const InnerWrapper = memo(InnerWrapperComponent)

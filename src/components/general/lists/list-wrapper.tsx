import { FC, memo } from 'react'
import { CardHeader } from '@app/components/stateless/card/header'
import { ListSkeleton, TextSkeleton } from '../../placeholders'
import { Button } from '../buttons'
import { UserManager } from '@app/managers'

const emptyClass = 'min-h-10'

const onLogout = () => {
  UserManager.clearUser()
  window.location.href = '/'
}

const SingleList = () => {
  return (
    <div className='flex px-4 py-3 w-full text-left hover:bg-gray-100 min-h-[45px]'>
      <div className='flex flex-1'>
        <TextSkeleton width={200} height={12} />
      </div>
      <TextSkeleton width={12} height={12} />
    </div>
  )
}

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
    small,
    count,
    full,
  } = props

  // Loading
  if (!data && loading) {
    if (full) {
      // basic fullscreen loader
      return <div className='w-full h-full bg-gray-100'></div>
    }
    if (small) {
      return (
        <>
          {Array.from(Array(count || 10).keys()).map(
            (item: string | number) => (
              <SingleList key={item} />
            )
          )}
        </>
      )
    }
    return <ListSkeleton avatar={avatar} />
  }

  // ERROR PAGE to display errors ( not actual network error )
  if (!data && !loading && error) {
    return (
      <CardHeader
        title='Error'
        subheader='An Issue occurred. Please try again. If issue persist please contact support.'
        className={emptyClass}
      >
        <Button onClick={onLogout}>Logout</Button>
      </CardHeader>
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

import { memo } from 'react'
import { CardHeader } from '@app/components/stateless/card/header'
import { ListSkeleton } from '../../placeholders'
import { Button } from '../buttons'
import { UserManager } from '@app/managers'
import { Cell } from '../cells/cell'
import { Website } from '@app/types'

const emptyClass = 'min-h-10'

function WebSites({ data }: any) {
  return data?.map((props: Website) => (
    <Cell key={props.url} url={props.url} domain={props.domain} />
  ))
}

const onLogout = () => {
  UserManager.clearUser()
  window.location.href = '/'
}

// TODO: remove for central history component
export function ListComponent({
  data,
  error,
  loading,
  emptyHeaderTitle = 'Empty',
  emptyHeaderSubTitle = 'Add your website below',
}: any) {
  if (!data?.length && loading) {
    return <ListSkeleton />
  }
  if (!data.length && !loading && error) {
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

  if (data?.length) {
    return (
      <ul className={`border rounded bg-white`}>
        <WebSites data={data} />
      </ul>
    )
  }

  return (
    <CardHeader
      title={emptyHeaderTitle}
      subheader={emptyHeaderSubTitle}
      className={emptyClass}
    />
  )
}

export const List = memo(ListComponent)

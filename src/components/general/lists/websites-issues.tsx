import { memo, FC, PropsWithChildren } from 'react'
import { listStyle } from '@app/styles/lists/tw'
import { ListCell } from './render/issues/cell'

// Issues Lists
export const ListComponent: FC<PropsWithChildren<any>> = ({
  data,
  error,
  loading,
  emptyHeaderTitle = 'Empty',
  emptyHeaderSubTitle = 'Add your website below',
  children,
}) => {
  return (
    <ul className={listStyle} aria-live='polite'>
      {data?.map((item: any) => (
        <ListCell
          key={item._id}
          item={item}
          loading={loading}
          error={error}
          emptyHeaderTitle={emptyHeaderTitle}
          emptyHeaderSubTitle={emptyHeaderSubTitle}
        />
      ))}
      {children}
    </ul>
  )
}

export const List = memo(ListComponent)

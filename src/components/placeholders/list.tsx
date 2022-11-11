import React from 'react'
import { ListItemSkeleton, ListItemIssuesSkeleton } from './list-item'

export function ListSkeleton({
  count = 3,
  subTitle = true,
  smallCircle = false,
  avatar = true,
  report = false,
}: any): any {
  const Skeleton = report ? ListItemIssuesSkeleton : ListItemSkeleton

  return (
    <ul className='list-none py-6 w-full'>
      {Array.from(Array(count).keys()).map((item: string | number) => (
        <Skeleton
          key={item}
          subTitle={subTitle}
          smallCircle={smallCircle}
          avatar={avatar}
        />
      ))}
    </ul>
  )
}

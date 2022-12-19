import React from 'react'
import { Skeleton } from './skeleton'

export function SimpleListItemSkeleton() {
  return (
    <li className='flex flex-col gap-y-2'>
      <Skeleton style={{ height: 14, width: '30%' }} />
      <Skeleton style={{ height: 14, width: '40%' }} />
    </li>
  )
}

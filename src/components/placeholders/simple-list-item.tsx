import React from 'react'
import { Skeleton } from './skeleton'

export function SimpleListItemSkeleton() {
  return (
    <li>
      <Skeleton style={{ height: 14, width: '30%' }} />
      <Skeleton style={{ height: 14, width: '40%', marginTop: 8 }} />
    </li>
  )
}

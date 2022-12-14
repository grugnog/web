import React from 'react'
import { Skeleton } from './skeleton'

export function DashboardCellLoader({ count = 2 }: { count?: number }) {
  return (
    <ul className='list-none py-6 w-full space-y-2'>
      {Array.from(Array(count).keys()).map((item: string | number) => (
        <li key={item} className={'list-none'}>
          <Skeleton className={'h-[50vh] md:h-[573.359px] w-full'} />
        </li>
      ))}
    </ul>
  )
}

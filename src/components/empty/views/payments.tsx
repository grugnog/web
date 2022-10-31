import React from 'react'
import { SimpleListItemSkeleton } from '@app/components/placeholders'

interface EmptyPayments {
  subTitle: string
}

export const EmptyPayments = ({ subTitle }: EmptyPayments) => {
  return (
    <div className='flex-1 flex flex-col'>
      <p className='text-2xl font-bold'>{subTitle}</p>
      <ul className='list-none'>
        <SimpleListItemSkeleton />
        <SimpleListItemSkeleton />
      </ul>
    </div>
  )
}

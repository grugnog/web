import React from 'react'
import { SimpleListItemSkeleton } from '@app/components/placeholders'

interface EmptyPayments {
  subTitle: string
}

export const EmptyPayments = ({ subTitle }: EmptyPayments) => {
  return (
    <div className='flex-1 flex flex-col'>
      <p className='text-xl pb-2'>{subTitle || 'Payments'}</p>
      <ul className='list-none pt-6'>
        <SimpleListItemSkeleton />
        <SimpleListItemSkeleton />
      </ul>
    </div>
  )
}

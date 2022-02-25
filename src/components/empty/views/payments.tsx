import React from 'react'
import { SimpleListItemSkeleton } from '@app/components/placeholders'
import { List } from '@material-ui/core'

interface EmptyPayments {
  subTitle: string
}

export const EmptyPayments = ({ subTitle }: EmptyPayments) => {
  return (
    <div>
      <p className='text-2xl font-bold'>{subTitle}</p>
      <List>
        <SimpleListItemSkeleton />
        <SimpleListItemSkeleton />
      </List>
    </div>
  )
}

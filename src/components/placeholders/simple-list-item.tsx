import React from 'react'
import { ListItem, ListItemText } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

export function SimpleListItemSkeleton() {
  return (
    <ListItem>
      <ListItemText
        disableTypography
        primary={<Skeleton height={14} width='30%' />}
        secondary={
          <Skeleton height={14} width='40%' style={{ marginTop: 8 }} />
        }
      />
    </ListItem>
  )
}

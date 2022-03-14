import React from 'react'
import { List } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { EmptyWebsiteForm } from '../general/website/empty-form'

interface PageLoader {
  loading?: boolean
  empty?: boolean // has a website
  children?: any
  emptyTitle?: string
  emptySubTitle?: string
  hasWebsite?: boolean
  error?: any
}
export function PageLoader({
  loading,
  empty,
  children,
  emptyTitle,
  emptySubTitle,
  hasWebsite = false,
  error = false,
}: PageLoader) {
  if (loading && !empty) {
    return (
      <List>
        <div className={`py-20`}>
          <Skeleton variant='rect' width={'100%'} height={400} />
        </div>
      </List>
    )
  }
  if (!loading && empty && !error) {
    return (
      <EmptyWebsiteForm
        emptyHeaderTitle={emptyTitle}
        emptyHeaderSubTitle={emptySubTitle}
        hasWebsite={hasWebsite}
      />
    )
  }
  if (!loading && error) {
    // TODO: DISPLAY AN ERROR FORM INSTEAD
    return (
      <EmptyWebsiteForm
        emptyHeaderTitle={'An Error occured, please try to again later'}
        emptyHeaderSubTitle={
          'If the issue persist please contact support or try to reload your browser.'
        }
        hasWebsite={hasWebsite}
      />
    )
  }

  return children || null
}

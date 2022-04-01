import React from 'react'
import { EmptyWebsiteForm } from '../general/website/empty-form'
import { ListSkeleton } from '@app/components/placeholders'

interface PageLoader {
  loading?: boolean
  empty?: boolean // has data
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
  if (empty) {
    if (loading) {
      return <ListSkeleton />
    }
    if (!loading && !error) {
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
  }

  return children || null
}

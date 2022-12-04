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
  goToPayments?: boolean // navigate to payments page on empty display
}
export function PageLoader({
  loading,
  empty,
  children,
  emptyTitle,
  emptySubTitle,
  hasWebsite = false,
  error = false,
  goToPayments = false,
}: PageLoader) {
  // when empty display loaders
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
          goToPayments={goToPayments}
        />
      )
    }
    if (!loading && error) {
      return (
        <EmptyWebsiteForm
          emptyHeaderTitle={'An Error occurred, please try to again later'}
          emptyHeaderSubTitle={
            'If the issue persist please contact support or try to reload your browser.'
          }
          hasWebsite={hasWebsite}
          goToPayments={goToPayments}
        />
      )
    }
  }

  return children || null
}

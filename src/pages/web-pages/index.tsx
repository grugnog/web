import { useMemo } from 'react'
import {
  PageTitle,
  Drawer,
  PaymentPlans,
  Spacer,
  AuthMenu,
} from '@app/components/general'
import { List } from '@app/components/general/lists/websites-pages'
import { useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { PageLoader } from '@app/components/placeholders'
import { useWebsiteContext } from '@app/components/providers/website'
import { LoadMoreButton } from '@app/components/general/buttons'
import { useAuthContext } from '@app/components/providers/auth'
import { Skeleton } from '@app/components/placeholders/skeleton'

export function WebPagesPage() {
  const { pagesData, pagesDataLoading, refetch, error, onLoadMorePages } =
    useWebsiteContext()
  const { search } = useSearchFilter()

  // search local filtering
  const source = useMemo(
    () => (Array.isArray(pagesData) ? filterSort(pagesData, search) : []),
    [pagesData, search]
  )

  return (
    <PageLoader
      empty={pagesData?.length === 0}
      loading={pagesDataLoading}
      hasWebsite={!!pagesData?.length}
      emptyTitle={'No Websites Added'}
      error={error}
    >
      <List
        data={source}
        loading={pagesDataLoading}
        refetch={refetch}
        emptyHeaderTitle='No pages found'
        emptyHeaderSubTitle='Pages will appear here if issues arise'
      >
        <li>
          <LoadMoreButton
            visible={source.length > 1}
            onLoadMoreEvent={onLoadMorePages}
          />
        </li>
      </List>
    </PageLoader>
  )
}

export function WebPages({ name }: PageProps) {
  const { account } = useAuthContext()

  return (
    <>
      <Drawer title={name}>
        <PageTitle
          title={account.activeSubscription ? name : 'Upgrade Required'}
          rightButton={<AuthMenu authenticated={account.authed} settings />}
        />
        <Spacer height={'8px'} />
        {account.activeSubscription ? (
          <WebPagesPage />
        ) : account.inited ? (
          <PaymentPlans pricingPage />
        ) : (
          <Skeleton className='h-full w-full' />
        )}
      </Drawer>
    </>
  )
}

export default metaSetter(
  { WebPages },
  {
    description: 'All of your pages displayed with web vitals.',
    gql: true,
    wasm: true,
  }
)

import { useMemo } from 'react'
import { FormDialog, PageTitle, Drawer } from '@app/components/general'
import { List } from '@app/components/general/lists/websites-analytics'
import { useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { PageLoader } from '@app/components/placeholders'
import { useWebsiteContext } from '@app/components/providers/website'
import { LoadMoreButton } from '@app/components/general/buttons'

function Analytics({ name }: PageProps) {
  const {
    analyticsData,
    analyticsDataLoading,
    refetch,
    error,
    onLoadMoreAnalytics,
  } = useWebsiteContext()
  const { search } = useSearchFilter()

  // search local filtering
  const source = useMemo(
    () =>
      Array.isArray(analyticsData) ? filterSort(analyticsData, search) : [],
    [analyticsData, search]
  )

  return (
    <>
      <Drawer title={name}>
        <PageTitle title={name} />
        <PageLoader
          empty={analyticsData?.length === 0}
          loading={analyticsDataLoading}
          hasWebsite={!!analyticsData?.length}
          emptyTitle={'No Websites Added'}
          error={error}
        >
          <div className={'py-2'}>
            <List
              data={source}
              loading={analyticsDataLoading}
              refetch={refetch}
              BottomButton={FormDialog}
              emptyHeaderTitle='No issues found'
              emptyHeaderSubTitle='Issues will appear here when they arise'
            />
            <LoadMoreButton
              visible={source.length > 1}
              onLoadMoreEvent={onLoadMoreAnalytics}
            />
          </div>
        </PageLoader>
      </Drawer>
    </>
  )
}

export default metaSetter(
  { Analytics },
  {
    description: 'Your analytics on issues displayed visually using charts.',
    gql: true,
    wasm: true,
  }
)

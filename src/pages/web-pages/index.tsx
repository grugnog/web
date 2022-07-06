import { useMemo } from 'react'
import { FormDialog, PageTitle, Drawer } from '@app/components/general'
import { List } from '@app/components/general/lists/websites-pages'
import { useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { PageLoader } from '@app/components/placeholders'
import { useWebsiteContext } from '@app/components/providers/website'
import { LoadMoreButton } from '@app/components/general/buttons'

function WebPages({ name }: PageProps) {
  const {
    pagesData,
    pagesDataLoading,
    refetch,
    error,
    onLoadMorePages,
  } = useWebsiteContext()
  const { search } = useSearchFilter()

  // search local filtering
  const source = useMemo(
    () => (Array.isArray(pagesData) ? filterSort(pagesData, search) : []),
    [pagesData, search]
  )

  return (
    <>
      <Drawer title={name}>
        <PageTitle title={name} />
        <PageLoader
          empty={pagesData?.length === 0}
          loading={pagesDataLoading}
          hasWebsite={!!pagesData?.length}
          emptyTitle={'No Websites Added'}
          error={error}
        >
          <div className={'py-2'}>
            <List
              data={source}
              loading={pagesDataLoading}
              refetch={refetch}
              BottomButton={FormDialog}
              emptyHeaderTitle='No pages found'
              emptyHeaderSubTitle='Pages will appear here if issues arise'
            />
            <LoadMoreButton
              visible={source.length > 1}
              onLoadMoreEvent={onLoadMorePages}
            />
          </div>
        </PageLoader>
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

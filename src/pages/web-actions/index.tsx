import { useMemo } from 'react'
import { FormDialog, PageTitle, Drawer } from '@app/components/general'
import { List } from '@app/components/general/lists/websites-pages-actions'
import { useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { PageLoader } from '@app/components/placeholders'
import { useWebsiteContext } from '@app/components/providers/website'
import { LoadMoreButton } from '@app/components/general/buttons'

function WebActions({ name }: PageProps) {
  const { actionsData, actionsDataLoading, refetch, error, onLoadMoreActions } =
    useWebsiteContext()
  const { search } = useSearchFilter()

  // search local filtering
  const source = useMemo(
    () => (Array.isArray(actionsData) ? filterSort(actionsData, search) : []),
    [actionsData, search]
  )

  return (
    <>
      <Drawer title={name}>
        <PageTitle title={name} />
        <p className='text-xl'>BETA</p>
        <PageLoader
          empty={actionsData?.length === 0}
          loading={actionsDataLoading}
          hasWebsite={!!actionsData?.length}
          emptyTitle={'No Websites Added'}
          error={error}
        >
          <div className={'py-2'}>
            <List
              data={source}
              loading={actionsDataLoading}
              refetch={refetch}
              BottomButton={FormDialog}
              emptyHeaderTitle='No Actions found'
              emptyHeaderSubTitle='Actions will appear here if you add them initially'
            />
            <LoadMoreButton
              visible={source.length > 1}
              onLoadMoreEvent={onLoadMoreActions}
            />
          </div>
        </PageLoader>
        <div className='p-3 border rounded'>
          <p className='text-sm'>
            Updating actions coming soon, in the mean time remove your website
            and re-add your actions.
          </p>
        </div>
      </Drawer>
    </>
  )
}

export default metaSetter(
  { WebActions },
  {
    description: 'Your web page actions to run during testing.',
    gql: true,
    wasm: true,
  }
)

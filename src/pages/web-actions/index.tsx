import React, { useMemo } from 'react'
import { FormDialog, PageTitle, Drawer, Button } from '@app/components/general'
import { List } from '@app/components/general/lists/websites-pages-actions'
import { useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { PageLoader } from '@app/components/placeholders'
import { useWebsiteContext } from '@app/components/providers/website'

function Actions({ name }: PageProps) {
  const {
    actionsData,
    actionsDataLoading,
    refetch,
    error,
    onLoadMorePages,
  } = useWebsiteContext()
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
        <p className='text-xl'>
          BETA - Updating action coming soon. In the mean time remove your
          website and re add your actions.
        </p>
        <PageLoader
          empty={actionsData?.length === 0}
          loading={actionsDataLoading}
          hasWebsite={!!actionsData?.length}
          emptyTitle={'No Websites Added'}
          error={error}
        >
          <div className={'py-2 '}>
            <List
              data={source}
              loading={actionsDataLoading}
              refetch={refetch}
              BottomButton={FormDialog}
              emptyHeaderTitle='No Actions found'
              emptyHeaderSubTitle='Actions will appear here if you add them initially'
            />
            {source.length > 1 ? (
              <div className='flex place-content-center pt-8'>
                <Button onClick={onLoadMorePages} className={'w-40'}>
                  Load More
                </Button>
              </div>
            ) : null}
          </div>
        </PageLoader>
      </Drawer>
    </>
  )
}

export default metaSetter(
  { Actions },
  {
    gql: true,
    description: 'Your page actions to run during test.',
  }
)

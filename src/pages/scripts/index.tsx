import React, { useMemo } from 'react'
import { FormDialog, PageTitle, Drawer } from '@app/components/general'
import { List } from '@app/components/general/lists/websites-scripts'
import { useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { PageLoader } from '@app/components/placeholders'
import { useWebsiteContext } from '@app/components/providers/website'
import { LoadMoreButton } from '@app/components/general/buttons'

const emptyHeaderTitle = 'No scripts found'
const emptyHeaderSubTitle =
  'Scripts will appear here for basic or premium accounts.'

function Scripts({ name }: PageProps) {
  const {
    scriptsData,
    scriptsDataLoading,
    refetch,
    error,
    onLoadMoreScripts,
  } = useWebsiteContext()
  const { search } = useSearchFilter()

  // search local filtering
  const source = useMemo(
    () => (Array.isArray(scriptsData) ? filterSort(scriptsData, search) : []),
    [scriptsData, search]
  )

  return (
    <>
      <Drawer title={name}>
        <PageTitle title={name} />
        <PageLoader
          empty={scriptsData?.length === 0}
          loading={scriptsDataLoading}
          hasWebsite={!!scriptsData?.length}
          emptyTitle={emptyHeaderTitle}
          emptySubTitle={emptyHeaderSubTitle}
          error={error}
        >
          <div className={'py-2'}>
            <List
              data={source}
              loading={scriptsDataLoading}
              refetch={refetch}
              BottomButton={FormDialog}
              emptyHeaderTitle='No scripts found'
              emptyHeaderSubTitle={
                'Scripts will appear here for basic or premium accounts.'
              }
            />
            <LoadMoreButton
              visible={source.length > 1}
              onLoadMoreEvent={onLoadMoreScripts}
            />
          </div>
        </PageLoader>
      </Drawer>
    </>
  )
}

export default metaSetter(
  { Scripts },
  {
    description:
      'Custom scripts to fix your web page. All scripts are optimized for your website specifically.',
    gql: true,
  }
)

import React, { useMemo } from 'react'
import { List, FormDialog, PageTitle, Drawer } from '@app/components/general'
import { useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { PageLoader } from '@app/components/placeholders'
import { useWebsiteContext } from '@app/components/providers/website'

function Issues({ name }: PageProps) {
  const { issueData, issueDataLoading, refetch, error } = useWebsiteContext()
  const { search } = useSearchFilter()

  // search local filtering
  const source = useMemo(
    () => (Array.isArray(issueData) ? filterSort(issueData, search) : []),
    [issueData, search]
  )

  return (
    <>
      <Drawer title={name}>
        <PageTitle title={name} />
        <PageLoader
          empty={issueData?.length === 0}
          loading={issueDataLoading}
          hasWebsite={!!issueData?.length}
          emptyTitle={'No Websites Added'}
          error={error}
        >
          <div className='py-1'>
            <List
              data={source}
              loading={issueDataLoading}
              refetch={refetch}
              BottomButton={FormDialog}
              emptyHeaderTitle='No issues found'
              emptyHeaderSubTitle='Issues will appear here when they arise'
              errorPage
            />
          </div>
        </PageLoader>
      </Drawer>
    </>
  )
}

export default metaSetter(
  { Issues },
  {
    gql: true,
  }
)

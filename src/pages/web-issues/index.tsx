import { useMemo } from 'react'
import { FormDialog, PageTitle, Drawer } from '@app/components/general'
import { List } from '@app/components/general/lists/websites-issues'
import { useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { PageLoader } from '@app/components/placeholders'
import { useWebsiteContext } from '@app/components/providers/website'
import { LoadMoreButton } from '@app/components/general/buttons'

function WebIssues({ name }: PageProps) {
  const {
    issueData,
    issueDataLoading,
    refetch,
    error,
    onLoadMoreIssues,
  } = useWebsiteContext()
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
          <div className={'py-2'}>
            <List
              data={source}
              loading={issueDataLoading}
              refetch={refetch}
              BottomButton={FormDialog}
              emptyHeaderTitle='No issues found'
              emptyHeaderSubTitle='Issues will appear here when they arise'
            />
            <LoadMoreButton
              visible={source.length > 1}
              onLoadMoreEvent={onLoadMoreIssues}
            />
          </div>
        </PageLoader>
      </Drawer>
    </>
  )
}

export default metaSetter(
  { WebIssues },
  {
    description: 'Your list of websites with issues displayed.',
    gql: true,
    wasm: true,
  }
)

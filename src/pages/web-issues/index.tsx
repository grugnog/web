import { FormDialog, PageTitle, Drawer } from '@app/components/general'
import { List } from '@app/components/general/lists/websites-issues'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { PageLoader } from '@app/components/placeholders'
import { useWebsiteContext } from '@app/components/providers/website'
import { LoadMoreButton } from '@app/components/general/buttons'
import { useFilterSort } from '@app/data/local'

function WebIssues({ name }: PageProps) {
  const { issueData, issueDataLoading, refetch, error, onLoadMoreIssues } =
    useWebsiteContext()
  const { sortedData } = useFilterSort(issueData)

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
          <List
            data={sortedData}
            loading={issueDataLoading}
            refetch={refetch}
            BottomButton={FormDialog}
            emptyHeaderTitle='No issues found'
            emptyHeaderSubTitle='Issues will appear here when they arise'
          >
            <li>
              <LoadMoreButton
                visible={sortedData.length > 1}
                onLoadMoreEvent={onLoadMoreIssues}
              />
            </li>
          </List>
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

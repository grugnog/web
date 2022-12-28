import { PageTitle, Drawer, AuthMenu } from '@app/components/general'
import { List } from '@app/components/general/lists/websites-issues'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { PageLoader } from '@app/components/placeholders'
import { useWebsiteContext } from '@app/components/providers/website'
import { LoadMoreButton } from '@app/components/general/buttons'
import { useAuthContext } from '@app/components/providers/auth'

function WebIssues({ name }: PageProps) {
  const {
    issueData,
    networkStatusIssues,
    issueDataLoading,
    refetch,
    error,
    onLoadMoreIssues,
  } = useWebsiteContext()
  const { account } = useAuthContext()

  return (
    <>
      <Drawer title={name}>
        <PageTitle
          title={name}
          rightButton={<AuthMenu authenticated={account.authed} settings />}
        />
        <PageLoader
          empty={issueData.length === 0}
          loading={issueDataLoading}
          hasWebsite={!!issueData.length}
          emptyTitle={'No Websites Added'}
          error={error}
        >
          <List
            data={issueData}
            loading={issueDataLoading}
            refetch={refetch}
            emptyHeaderTitle='No issues found'
            emptyHeaderSubTitle='Issues will appear here when they arise'
          >
            <li>
              <LoadMoreButton
                visible={issueData.length > 1}
                onLoadMoreEvent={onLoadMoreIssues}
                loading={networkStatusIssues === 3}
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

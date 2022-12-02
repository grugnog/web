import { useMemo } from 'react'
import { FormDialog, PageTitle, Drawer } from '@app/components/general'
import { List } from '@app/components/general/lists/websites-scripts'
import { useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { PageLoader } from '@app/components/placeholders'
import { useWebsiteContext } from '@app/components/providers/website'
import { LoadMoreButton } from '@app/components/general/buttons'
import { useAuthContext } from '@app/components/providers/auth'

const emptyHeaderTitle = 'No scripts found'

function Scripts({ name }: PageProps) {
  const { scriptsData, scriptsDataLoading, refetch, error, onLoadMoreScripts } =
    useWebsiteContext()
  const { search } = useSearchFilter()
  const { activeSubscription } = useAuthContext()

  // search local filtering
  const source = useMemo(
    () => (Array.isArray(scriptsData) ? filterSort(scriptsData, search) : []),
    [scriptsData, search]
  )

  const emptyHeaderSub = `Scripts will appear here ${activeSubscription ? 'when issues exist' : 'for paid accounts'}.`;

  return (
    <>
      <Drawer title={name}>
        <PageTitle title={name} />
        <PageLoader
          empty={scriptsData?.length === 0}
          loading={scriptsDataLoading}
          hasWebsite={!!scriptsData?.length}
          emptyTitle={emptyHeaderTitle}
          emptySubTitle={emptyHeaderSub}
          error={error}
        >
          <List
            data={source}
            loading={scriptsDataLoading}
            refetch={refetch}
            BottomButton={FormDialog}
            emptyHeaderTitle={emptyHeaderTitle}
            emptyHeaderSubTitle={emptyHeaderSub}
          >
            <li>
              <LoadMoreButton
                visible={source.length > 1}
                onLoadMoreEvent={onLoadMoreScripts}
              />
            </li>
          </List>
        </PageLoader>
      </Drawer>
    </>
  )
}

export default metaSetter(
  { Scripts },
  {
    description:
      'Custom embedded scripts to fix your web page. All scripts are optimized for your website specifically.',
    gql: true,
    wasm: true,
  }
)

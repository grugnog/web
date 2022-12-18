import { useMemo } from 'react'
import {
  FormDialog,
  PageTitle,
  Drawer,
  PriceMemo,
  Spacer,
  AuthMenu,
} from '@app/components/general'
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

const ScriptsPage = () => {
  const { scriptsData, scriptsDataLoading, refetch, error, onLoadMoreScripts } =
    useWebsiteContext()
  const { search } = useSearchFilter()
  const { account } = useAuthContext()

  const { activeSubscription } = account

  // search local filtering
  const source = useMemo(
    () => (Array.isArray(scriptsData) ? filterSort(scriptsData, search) : []),
    [scriptsData, search]
  )

  const emptyHeaderSub = `Scripts will appear here ${
    activeSubscription ? 'when issues exist' : 'for paid accounts'
  }.`

  return (
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
  )
}

function Scripts({ name }: PageProps) {
  const { account } = useAuthContext()

  return (
    <Drawer title={name}>
      <PageTitle
        title={account.activeSubscription ? name : 'Upgrade Required'}
        rightButton={<AuthMenu authenticated={account.authed} settings />}
      />
      <Spacer height={'8px'} />
      {account.activeSubscription ? <ScriptsPage /> : <PriceMemo navigate />}
    </Drawer>
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

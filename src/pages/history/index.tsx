import { Fragment } from 'react'
import {
  List,
  FormDialog,
  PageTitle,
  LinearBottom,
  Drawer,
  Spacer,
} from '@app/components/general'
import { useHistory, useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { PageLoader } from '@app/components/placeholders'
import { useWebsiteContext } from '@app/components/providers/website'

const History = ({ name }: PageProps) => {
  const { data: websiteData } = useWebsiteContext()
  const { data, loading, refetch } = useHistory()
  const { search } = useSearchFilter()
  const listData = filterSort(data, search)

  return (
    <Fragment>
      <Drawer title={name}>
        <PageTitle title={name} />
        <Spacer height={'8px'} />
        <PageLoader
          empty={listData.length === 0}
          loading={loading}
          hasWebsite={!!websiteData?.length}
          emptyTitle={'No Websites Removed Yet'}
          emptySubTitle={'After you remove a website they will show up here.'}
        >
          <List
            data={listData}
            loading={loading}
            refetch={refetch}
            BottomButton={FormDialog}
            history
            emptyHeaderTitle='No websites found'
            emptyHeaderSubTitle='Websites will appear here once you remove them from the dashboard'
          />
        </PageLoader>
      </Drawer>
      <LinearBottom loading={loading} />
    </Fragment>
  )
}

export default metaSetter(
  { History },
  {
    description: 'Past websites that have been used.',
    gql: true,
    wasm: true,
  }
)

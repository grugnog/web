import React, { useMemo } from 'react'
import {
  List,
  FormDialog,
  PageTitle,
  LinearBottom,
  Drawer,
  Spacer,
} from '@app/components/general'
import { useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { PageLoader } from '@app/components/placeholders'
import { useWebsiteContext } from '@app/components/providers/website'

function Issues({ name }: PageProps) {
  const { data, loading, refetch, error } = useWebsiteContext()
  const { search } = useSearchFilter()
  const source = useMemo(() => filterSort(data, search), [data, search])

  // TODO: USE QUERY ON ISSUES INSTEAD OF WEBSITE
  const issuesFound = source?.length
    ? source?.reduceRight(function (page, nextPage) {
        return page + nextPage?.issuesInfo?.totalIssues
      }, 0)
    : 0

  return (
    <>
      <Drawer title={name}>
        <PageTitle title={name} />
        <Spacer height={'8px'} />
        <PageLoader
          empty={issuesFound === 0}
          loading={loading}
          hasWebsite={!!data?.length}
          emptyTitle={'No Websites Added'}
          error={error}
        >
          <List
            data={source}
            loading={loading}
            refetch={refetch}
            BottomButton={FormDialog}
            emptyHeaderTitle='No issues found'
            emptyHeaderSubTitle='Issues will appear here when they arise'
            errorPage
          />
        </PageLoader>
      </Drawer>
      <LinearBottom loading={!!loading} />
    </>
  )
}

export default metaSetter(
  { Issues },
  {
    gql: true,
  }
)

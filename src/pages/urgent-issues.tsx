import React, { Fragment, useMemo } from 'react'
import {
  List,
  FormDialog,
  PageTitle,
  LinearBottom,
  Drawer,
  Spacer,
} from '@app/components/general'
import { useWebsiteData, useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { PageLoader } from '@app/components/placeholders'

function Urgent({ name }: PageProps) {
  // TODO: ONLY USE CONTEXT TO GET WEBSITE DATA
  const { data, loading, refetch, error } = useWebsiteData('error')
  const { search } = useSearchFilter()
  const source = useMemo(() => filterSort(data, search) || [], [data, search])

  const issuesFound = source?.length
    ? source?.reduceRight(function (page, nextPage) {
        return page + nextPage?.issuesInfo?.totalIssues
      }, 0)
    : 0

  return (
    <Fragment>
      <Drawer title={name}>
        <PageTitle title={name} />
        <Spacer height={'8px'} />
        <PageLoader
          loading={loading}
          hasWebsite={!!data?.length}
          emptyTitle={'No Issues Found'}
          error={error}
          empty={issuesFound === 0}
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
    </Fragment>
  )
}

export default metaSetter(
  { Urgent },
  {
    description:
      'Urgent issues that should be looked at reguarding accessibility. View the details on how to fix your issues for page.',
    gql: true,
  }
)

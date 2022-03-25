import React, { Fragment, useMemo } from 'react'
import {
  List,
  FormDialog,
  PageTitle,
  LinearBottom,
  Drawer,
} from '@app/components/general'
import { useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { PageLoader } from '@app/components/placeholders'
import { useWebsiteContext } from '@app/components/providers/website'

function Urgent({ name }: PageProps) {
  const { data, loading, refetch, error } = useWebsiteContext()
  const { search } = useSearchFilter()
  const source = useMemo(() => filterSort(data, search) || [], [data, search])

  // TODO: REMOVE. ISSUES ALWAYS RETURN FROM API
  const issuesFound = useMemo(() => {
    return source?.length
      ? source?.reduceRight(function (page, nextPage) {
          return page + nextPage?.issuesInfo?.totalIssues
        }, 0)
      : 0
  }, [source])

  return (
    <Fragment>
      <Drawer title={name}>
        <PageTitle title={name} />
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
      'Urgent issues that should be looked at relating to accessibility. View the details on how to fix your issues for page.',
    gql: true,
    params: {
      filter: 'error',
    },
  }
)

import React from 'react'
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

function Issues({ name }: PageProps) {
  const { data, loading, refetch } = useWebsiteData()
  const { search } = useSearchFilter()
  const MAINDATASOURCE = filterSort(data, search)

  return (
    <>
      <Drawer title={name}>
        <PageTitle title={name} />
        <Spacer />
        <List
          data={MAINDATASOURCE}
          loading={loading}
          refetch={refetch}
          BottomButton={FormDialog}
          emptyHeaderTitle='No issues found'
          emptyHeaderSubTitle='Issues will appear here when they arise'
          errorPage
        />
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

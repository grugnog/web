import React from 'react'
import {
  List,
  FormDialog,
  PageTitle,
  LinearBottom,
  Drawer,
  Spacer,
} from '@app/components/general'
import { historyData, useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

const History = ({ name }: PageProps) => {
  const { data, loading, refetch, crawlWebsite } = historyData()
  const { search } = useSearchFilter()
  const listData = filterSort(data, search)

  return (
    <>
      <Drawer title={name}>
        <PageTitle title={name} />
        <Spacer />
        <List
          data={listData}
          loading={loading}
          refetch={refetch}
          crawlWebsite={crawlWebsite}
          BottomButton={FormDialog}
          history
          emptyHeaderTitle='No websites found'
          emptyHeaderSubTitle='Websites will appear here once you remove them from the dashboard'
        />
      </Drawer>
      <LinearBottom loading={loading} />
    </>
  )
}

export default metaSetter(
  { History },
  {
    description: 'Past websites that have been used.',
    gql: true,
  }
)

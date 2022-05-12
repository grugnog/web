import React from 'react'

import { PageTitle, LinearBottom, Drawer } from '@app/components/general'

import { WeekSelect } from '@app/components/alerts'
import { userData } from '@app/data'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

function Alerts({ name }: PageProps) {
  const {
    filterEmailDatesData,
    onFilterEmailDates,
    filterEmailDatesLoading,
  } = userData()

  return (
    <>
      <Drawer title={name}>
        <PageTitle title={'Alerts'} />
        <WeekSelect
          confirmDates={onFilterEmailDates}
          filterEmailDates={filterEmailDatesData}
        />
      </Drawer>
      <LinearBottom loading={filterEmailDatesLoading} />
    </>
  )
}

export default metaSetter({ Alerts }, { gql: true })

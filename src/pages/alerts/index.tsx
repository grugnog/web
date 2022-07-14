import React from 'react'

import { PageTitle, LinearBottom, Drawer } from '@app/components/general'

import { WeekSelect } from '@app/components/alerts'
import { useUserData } from '@app/data'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

function Alerts({ name }: PageProps) {
  const {
    filterEmailDatesData,
    onFilterEmailDates,
    filterEmailDatesLoading,
    data, // user
    loading,
  } = useUserData()

  if (!data && !loading) {
    return (
      <div className='px-2'>
        <PageTitle title={'Alerts'} />
        <div className='p-4 text-2xl'>
          Authentication required for alerts. Please login to continue.
        </div>
      </div>
    )
  }

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

export default metaSetter(
  { Alerts },
  {
    gql: true,
    description:
      'Set the treshold on how you want to receive your email updates.',
  }
)

import React from 'react'

import {
  PageTitle,
  LinearBottom,
  Drawer,
  AuthMenu,
} from '@app/components/general'

import { WeekSelect } from '@app/components/alerts'
import { useUserData } from '@app/data'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { useAuthContext } from '@app/components/providers/auth'

// todo: remove page for settings
function Alerts({ name }: PageProps) {
  const {
    filterEmailDatesData: filterEmailDates,
    onFilterEmailDates,
    filterEmailDatesLoading,
    data, // user
    loading,
  } = useUserData()
  const { account } = useAuthContext()
  const filterEmailDatesData =
    filterEmailDates ?? data?.user?.emailFilteredDates

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
        <PageTitle
          title={'Alerts'}
          rightButton={<AuthMenu authenticated={account.authed} settings />}
        />
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
    description: 'Determine how often you want to receive your email updates.',
  }
)

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { Fragment } from 'react'
import {
  List,
  FormDialog,
  PageTitle,
  LinearBottom,
  Drawer,
} from '@app/components/general'
import { useWebsiteData, useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

function Urgent({ name }: PageProps) {
  const { data, loading, refetch } = useWebsiteData('error')
  const { search } = useSearchFilter()
  const MAINDATASOURCE = filterSort(data, search)

  return (
    <Fragment>
      <Drawer title={name}>
        <PageTitle title={name} />
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

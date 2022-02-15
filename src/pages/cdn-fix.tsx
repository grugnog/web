/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { PageTitle, Drawer, CollaspeListCdn } from '@app/components/general'
import { ScriptsPageSkeleton } from '@app/components/placeholders'
import { groupBy, metaSetter } from '@app/utils'
import { scriptsData, useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import type { PageProps } from '@app/types'

function CdnFix({ name }: PageProps) {
  const { data, loading } = scriptsData()
  const { search } = useSearchFilter()
  const dataSource = groupBy('domain')(filterSort(data, search))
  const capsName = String(name).toUpperCase()

  return (
    <>
      <Drawer title={capsName}>
        <PageTitle title={capsName} />
        <ScriptsPageSkeleton
          dataLength={Object.keys(dataSource)?.length}
          loading={loading}
          emptyTitle={'No cdn scripts yet'}
        >
          <h2 className='font-bold text-xl'>Built for SP or MP Applications</h2>
          <p className='text-lg'>
            If your application is in nextjs, vue, or any SPA framework simply
            add the root domain script and it will automatically apply the
            appropriate script per page.
          </p>
          <CollaspeListCdn dataSource={dataSource} />
        </ScriptsPageSkeleton>
      </Drawer>
    </>
  )
}

export default metaSetter(
  { CdnFix },
  {
    gql: true,
  }
)

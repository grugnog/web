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
import { WithHydrate } from '@app/components/adhoc'
import type { PageProps } from '@app/types'

function Cdn({ name }: PageProps) {
  const { data, loading } = scriptsData()
  const { search } = useSearchFilter()
  const dataSource = groupBy('domain')(filterSort(data, search))
  const capsName = String(name).toUpperCase()

  return (
    <WithHydrate>
      <Drawer title={capsName}>
        <PageTitle title={capsName} />
        <ScriptsPageSkeleton
          dataLength={Object.keys(dataSource)?.length}
          loading={loading}
          emptyTitle={'No cdn scripts yet'}
        >
          <CollaspeListCdn dataSource={dataSource} />
        </ScriptsPageSkeleton>
      </Drawer>
    </WithHydrate>
  )
}

export default metaSetter({ Cdn })

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { PageTitle, Drawer, CollaspeList } from '@app/components/general'
import { ScriptsPageSkeleton } from '@app/components/placeholders'
import { scriptsData, useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import { groupBy, metaSetter } from '@app/utils'
import { WithHydrate } from '@app/components/adhoc'
import type { PageProps } from '@app/types'

function Scripts({ name }: PageProps) {
  const { data, loading } = scriptsData()
  const { search } = useSearchFilter()
  const dataSource = groupBy('domain')(filterSort(data, search))

  return (
    <WithHydrate>
      <Drawer title={name}>
        <PageTitle title={name} />
        <ScriptsPageSkeleton
          dataLength={Object.keys(dataSource)?.length}
          loading={loading}
        >
          <CollaspeList dataSource={dataSource} />
        </ScriptsPageSkeleton>
      </Drawer>
    </WithHydrate>
  )
}

export default metaSetter(
  { Scripts },
  {
    description:
      'Custom scripts to fix your web page. All scripts are optimized for your website specifically.',
    gql: true,
  }
)

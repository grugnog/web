import React, { useMemo } from 'react'
import { PageTitle, Drawer, CollaspeList } from '@app/components/general'
import { PageLoader } from '@app/components/placeholders'
import { scriptsData, useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import { groupBy, metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { useWebsiteContext } from '@app/components/providers/website'

function Scripts({ name }: PageProps) {
  const { data: websiteData } = useWebsiteContext()
  const { data, loading } = scriptsData()
  const { search } = useSearchFilter()

  const dataSource = useMemo(
    () => groupBy('domain')(filterSort(data, search)),
    [data, search]
  )

  return (
    <>
      <Drawer title={name}>
        <PageTitle title={name} />
        <PageLoader
          empty={Object.keys(dataSource).length === 0}
          emptySubTitle={'Scripts will appear here.'}
          loading={loading}
          hasWebsite={!!websiteData?.length}
        >
          <CollaspeList dataSource={dataSource} loading={loading} />
        </PageLoader>
      </Drawer>
    </>
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

import React, { useMemo } from 'react'
import { PageTitle, Drawer, CollaspeListCdn } from '@app/components/general'
import { PageLoader } from '@app/components/placeholders'
import { groupBy, metaSetter } from '@app/utils'
import { scriptsData, useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import type { PageProps } from '@app/types'
import { useWebsiteContext } from '@app/components/providers/website'

function CdnFix({ name }: PageProps) {
  const { data: websiteData } = useWebsiteContext()
  const { data, loading } = scriptsData()
  const { search } = useSearchFilter()

  const dataSource = useMemo(() => {
    return groupBy('domain')(filterSort(data, search))
  }, [data, search])

  const capsName = String(name).toUpperCase()

  return (
    <>
      <Drawer title={capsName}>
        <PageTitle title={capsName} />
        <PageLoader
          empty={Object.keys(dataSource).length === 0}
          hasWebsite={!!websiteData?.length}
          loading={loading}
          emptyTitle={'No cdn scripts yet'}
        >
          <div style={{ paddingTop: 8, paddingBottom: 8 }}>
            <h2 className='font-bold text-xl'>
              Built for single or multi page applications
            </h2>
            <p className='text-lg pb-4'>
              If your application is in nextjs, vue, or any SPA framework by
              simply adding the root domain script.
            </p>
            <CollaspeListCdn dataSource={dataSource} />
          </div>
        </PageLoader>
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

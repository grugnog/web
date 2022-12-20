import React from 'react'
import { List, FormDialog } from '@app/components/general'
import { useHistory } from '@app/data'
import { PageLoader } from '@app/components/placeholders'
import { useWebsiteContext } from '@app/components/providers/website'
import { useFilterSort } from '@app/data/local'

export const HistoryList = () => {
  const { data: websiteData } = useWebsiteContext()
  const { data, loading, refetch } = useHistory()
  const { sortedData } = useFilterSort(data)

  return (
    <PageLoader
      empty={sortedData.length === 0}
      loading={loading}
      hasWebsite={!!websiteData?.length}
      emptyTitle={'No Websites Removed Yet'}
      emptySubTitle={'After you remove a website they will show up here.'}
    >
      <List
        data={sortedData}
        loading={loading}
        refetch={refetch}
        BottomButton={FormDialog}
        historyPage
        emptyHeaderTitle='No websites found'
        emptyHeaderSubTitle='Websites will appear here once you remove them from the dashboard'
      />
    </PageLoader>
  )
}

import { FC, useEffect, useMemo } from 'react'
import { useWebsite } from '@app/data'
import type { Website } from '@app/types'
import { _ONBOARDED } from '@app/lib/cookies/names'
import { WebsiteList } from '@app/components/general/website-list'
import { useWebsiteContext } from '@app/components/providers/website'
import { companyName } from '@app/configs'
import { useInteractiveContext } from '@app/components/providers/interactive'
import Head from 'next/head'
import { HomeManager } from '@app/managers'

type DashboardWebsiteListProps = {
  sortModalVisible?: boolean
  queryModalVisible?: boolean
  url: string
}

export const DashboardWebsiteSingle: FC<DashboardWebsiteListProps> = ({
  sortModalVisible,
  queryModalVisible,
  url,
}) => {
  const { setModal, setSelectedWebsite } = useInteractiveContext()

  const {
    mutatationLoading,
    removeWebsite,
    refetch,
    crawlWebsite,
    lighthouseVisible,
    activeCrawls,
  } = useWebsiteContext()

  const { data, loading, error } = useWebsite(url)

  useEffect(() => {
    const clearData = error || (!data && !loading)
    // return to dashboard all display
    if (clearData) {
      HomeManager.setDashboardView('')
      setSelectedWebsite('')
    }
  }, [data, loading, error, setSelectedWebsite])

  const websites: Website[] = useMemo(() => {
    if (data?.website) {
      return [data.website]
    }
    return []
  }, [data])

  // conditional display
  let webpageStyle = 'visible py-2'

  if (sortModalVisible) {
    webpageStyle = 'hidden'
  }

  if (queryModalVisible) {
    webpageStyle = 'hidden'
  }

  return (
    <>
      {data?.pageInsights ? (
        <Head>
          <style>
            {`.lh-root .lh-topbar__url, .report-icon--download ${
              data?.length >= 2 ? ', .lh-tools' : ''
            } { display: none !important; } `}
          </style>
        </Head>
      ) : null}
      <div className={webpageStyle}>
        <WebsiteList
          data={websites}
          error={error}
          loading={loading}
          mutatationLoading={mutatationLoading}
          removePress={removeWebsite}
          crawlWebsite={crawlWebsite}
          refetch={refetch}
          setModal={setModal}
          lighthouseVisible={lighthouseVisible}
          emptyHeaderTitle={`Welcome to ${companyName}`}
          emptyHeaderSubTitle={'Add a website to get started'}
          activeCrawls={activeCrawls}
        ></WebsiteList>
      </div>
    </>
  )
}

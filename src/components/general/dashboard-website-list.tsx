import { FC, useMemo } from 'react'
import type { Website } from '@app/types'
import { _ONBOARDED } from '@app/lib/cookies/names'
import { WebsiteList } from '@app/components/general/website-list'
import { useWebsiteContext } from '@app/components/providers/website'
import { LoadMoreButton } from '@app/components/general/buttons'
import { companyName } from '@app/configs'
import { useInteractiveContext } from '@app/components/providers/interactive'
import Head from 'next/head'

type DashboardWebsiteListProps = {
  sortModalVisible?: boolean
  queryModalVisible?: boolean
}

export const DashboardWebsiteList: FC<DashboardWebsiteListProps> = ({
  sortModalVisible,
  queryModalVisible,
}) => {
  const { setModal } = useInteractiveContext()
  const {
    data,
    error,
    loading,
    mutatationLoading,
    removeWebsite,
    refetch,
    crawlWebsite,
    lighthouseVisible,
    onLoadMoreWebsites,
    activeCrawls,
  } = useWebsiteContext()

  const lhEnabled = useMemo(
    () => data?.some((web: Website) => web?.pageInsights),
    [data]
  )

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
      {lhEnabled ? (
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
          data={data}
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
        >
          <li>
            <LoadMoreButton
              visible={data?.length > 1}
              onLoadMoreEvent={onLoadMoreWebsites}
            />
          </li>
        </WebsiteList>
      </div>
    </>
  )
}

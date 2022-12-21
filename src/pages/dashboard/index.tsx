import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import { LinearBottom, Drawer } from '@app/components/general'
import { useSearchFilter, useEvents } from '@app/data'
import { filterSort } from '@app/lib'
import { metaSetter } from '@app/utils'
import type { PageProps, Website } from '@app/types'
import { _ONBOARDED } from '@app/lib/cookies/names'
import { WebsiteList } from '@app/components/general/website-list'
import { useWebsiteContext } from '@app/components/providers/website'
import { LoadMoreButton } from '@app/components/general/buttons'
import { SortableWebsiteList } from '@app/components/general/website'
import { companyName } from '@app/configs'
import { CtaInputRest } from '@app/components/cta/searchbar/cta-input-rest'
import { MarketingBottomTemporaryDrawer } from '@app/components/modal'
import { WCAGSelectInput } from '@app/components/general/select'
import { fetcher } from '@app/utils/fetcher'
import { AppManager } from '@app/managers'
import { useInteractiveContext } from '@app/components/providers/interactive'
import { RightBar } from '@app/components/general/dashboard-menu'
import { ModalType } from '@app/data/enums'
import { ViewConfigTitle } from '@app/components/general/view-config-title'

const CtaHtmlInputRest = dynamic(
  () =>
    import('../../components/cta/searchbar/cta-html-input-rest').then(
      (mod) => mod.CtaHtmlInputRest
    ),
  { ssr: false }
)

function Dashboard({ name }: PageProps) {
  const [sortModalVisible, setSortModalVisible] = useState<boolean>(false)
  const [queryModalVisible, setQueryModalVisible] = useState<boolean>(false)
  const [standard, setStandard] = useState<string>('WCAG2AA')

  const { search } = useSearchFilter()
  const { events, setEvents } = useEvents()
  const { setModal } = useInteractiveContext()
  const {
    data,
    error,
    loading,
    mutatationLoading,
    removeWebsite,
    refetch,
    crawlWebsite,
    subscriptionData,
    lighthouseVisible,
    onLoadMoreWebsites,
    activeCrawls,
  } = useWebsiteContext()

  const websites: Website[] = useMemo(
    () => filterSort(data, search),
    [data, search]
  )

  const { issueSubData } = subscriptionData

  useEffect(() => {
    // effect for first time user directing to alerts
    if (issueSubData && events && !events?.firstAdd) {
      setEvents({
        firstAdd: true,
      })
    }
  }, [issueSubData, events, setEvents])

  const lhEnabled = useMemo(
    () => websites?.some((web) => web?.pageInsights),
    [websites]
  )

  const onWebsiteSort = () =>
    setSortModalVisible((v) => {
      if (queryModalVisible) {
        setQueryModalVisible(false)
      }
      return !v
    })

  const onQueryEvent = () =>
    setQueryModalVisible((v) => {
      if (sortModalVisible) {
        setSortModalVisible(false)
      }
      return !v
    })

  const onAnalyticsEvent = async () => {
    const data = await fetcher('/list/website?=limit=50', null, 'GET')

    setModal({
      open: true,
      url: '',
      modalType: ModalType.analytics,
      data: data?.data,
    })
  }

  const onStandardChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setStandard(e.target.value)

  const onScanAllEvent = async () => {
    const { message, code } = await fetcher('/websites-sync', null, 'POST')

    AppManager.toggleSnack(
      true,
      message || 'Sync failed!',
      code === 200 ? 'message' : 'error'
    )
  }

  // conditional display
  let sortStyle = 'hidden'
  let queryStyle = 'hidden'
  let webpageStyle = 'visible py-2'

  if (sortModalVisible) {
    webpageStyle = 'hidden'
    sortStyle = 'visible'
  }

  if (queryModalVisible) {
    webpageStyle = 'hidden'
    queryStyle = 'visible'
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
      <Drawer title={name}>
        <ViewConfigTitle title={'All Sites'}>
          <RightBar
            sortCapable={data?.length >= 2}
            onQueryEvent={onQueryEvent}
            sortModalVisible={sortModalVisible}
            onWebsiteSort={onWebsiteSort}
            queryModalVisible={queryModalVisible}
            onScanAllEvent={onScanAllEvent}
            onAnalyticsEvent={onAnalyticsEvent}
          />
        </ViewConfigTitle>

        <div className={sortStyle}>
          <SortableWebsiteList refetch={refetch} />
        </div>

        <div className={queryStyle}>
          <div className='py-2 h-full'>
            <div className='flex flex-col place-items-center place-content-center space-y-6'>
              <WCAGSelectInput
                onStandardChange={onStandardChange}
                standard={standard}
                spacing
              />
              <CtaInputRest standard={standard} />
              <p>Or HTML</p>
              <CtaHtmlInputRest standard={standard} />
            </div>
            <MarketingBottomTemporaryDrawer authenticated />
          </div>
        </div>

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
          >
            <li>
              <LoadMoreButton
                visible={websites?.length > 1}
                onLoadMoreEvent={onLoadMoreWebsites}
              />
            </li>
          </WebsiteList>
        </div>
      </Drawer>
      <LinearBottom loading={mutatationLoading} />
    </>
  )
}

export default metaSetter(
  { Dashboard },
  {
    gql: true,
    wasm: true,
    rest: true,
  }
)

import { useCallback, useEffect, useMemo, useState } from 'react'
import Head from 'next/head'

import {
  Button,
  PageTitle,
  LinearBottom,
  Drawer,
  FormDialog,
} from '@app/components/general'
import { useDynamicModal, useSearchFilter, useEvents } from '@app/data'
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

// right bar
type RightBarProps = {
  onRemoveAllWebsitePress(x: any): void
  onQueryEvent(x: any): void
  onLighthouseToggle(x: any): void
  onWebsiteSort(x: any): void
  lighthouseVisible?: boolean
  lhEnabled?: boolean
  queryModalVisible?: boolean
  sortModalVisible?: boolean
  sortCapable?: boolean
}

const RightBar = ({
  onWebsiteSort,
  sortCapable,
  onRemoveAllWebsitePress,
  onQueryEvent,
  queryModalVisible,
  lhEnabled,
  onLighthouseToggle,
  lighthouseVisible,
  sortModalVisible,
}: RightBarProps) => {
  return (
    <div className='flex flex-wrap gap-x-2 gap-y-1 text-sm'>
      <Button
        onClick={onRemoveAllWebsitePress}
        aria-label={'Remove all websites'}
      >
        Remove All
      </Button>
      <Button
        onClick={onQueryEvent}
        className={queryModalVisible ? 'border-blue-800' : ''}
      >
        Scan
      </Button>
      <Button
        className={lhEnabled ? 'visible' : 'hidden'}
        onClick={onLighthouseToggle}
        aria-expanded={lighthouseVisible}
        aria-label={'Toggle lighthouse reports visibility.'}
      >
        {lighthouseVisible ? 'Hide' : 'Display'} Lighthouse
      </Button>
      {sortCapable ? (
        <Button
          onClick={onWebsiteSort}
          aria-label={'Sort websites'}
          className={sortModalVisible ? 'border-blue-800' : ''}
        >
          {sortModalVisible ? 'Toggle Sort' : 'Sort Websites'}
        </Button>
      ) : null}
      <FormDialog buttonTitle={`Subscribe`} />
    </div>
  )
}

function Dashboard({ name }: PageProps) {
  const [sortModalVisible, setSortModalVisible] = useState<boolean>(false)
  const [queryModalVisible, setQueryModalVisible] = useState<boolean>(false)

  const { search } = useSearchFilter()
  const { events, setEvents } = useEvents()
  const { setModal } = useDynamicModal()
  const {
    data,
    error,
    loading,
    mutatationLoading,
    removeWebsite,
    refetch,
    crawlWebsite,
    subscriptionData,
    setLighthouseVisibility,
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

  const onRemoveAllWebsitePress = useCallback(async () => {
    if (window.confirm('Are you sure you want to remove all websites?')) {
      try {
        await removeWebsite({
          variables: {
            url: '',
            deleteMany: true,
          },
        })
      } catch (e) {
        console.error(e)
      }
    }
  }, [removeWebsite])

  const onLighthouseToggle = useCallback(async () => {
    setLighthouseVisibility((visible: boolean) => !visible)
  }, [setLighthouseVisibility])

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

  // conditional display
  let sortStyle = 'hidden'
  let queryStyle = 'hidden'
  let webpageStyle = 'visible'

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
        <PageTitle
          title={'Websites'}
          rightButton={
            !!data?.length ? (
              <RightBar
                sortCapable={data?.length >= 2}
                onRemoveAllWebsitePress={onRemoveAllWebsitePress}
                onQueryEvent={onQueryEvent}
                lhEnabled={lhEnabled}
                lighthouseVisible={lighthouseVisible}
                sortModalVisible={sortModalVisible}
                onWebsiteSort={onWebsiteSort}
                onLighthouseToggle={onLighthouseToggle}
                queryModalVisible={queryModalVisible}
              />
            ) : null
          }
        />

        <div className={sortStyle}>
          <SortableWebsiteList refetch={refetch} />
        </div>
        
        <div className={queryStyle}>
          <div className='py-2'>
            <CtaInputRest />
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

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

function Dashboard({ name }: PageProps) {
  const [sortModalVisible, setSortModalVisible] = useState<boolean>()
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

  const onWebsiteSort = () => setSortModalVisible((v) => !v)

  // TODO: fix lighthouse allowing multiple websites at once.
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
              <div className='flex flex-wrap gap-x-2 gap-y-1 text-sm'>
                <Button
                  onClick={onRemoveAllWebsitePress}
                  className={'text-red-600'}
                  aria-label={'Remove all websites'}
                >
                  Remove All
                </Button>
                <FormDialog buttonTitle={`Subscribe`} />
                <Button
                  className={lhEnabled ? 'visible' : 'hidden'}
                  onClick={onLighthouseToggle}
                  aria-expanded={lighthouseVisible}
                  aria-label={'Toggle lighthouse reports visibility.'}
                >
                  {lighthouseVisible ? 'Hide' : 'Display'} Lighthouse
                </Button>
                {data?.length >= 2 ? (
                  <Button
                    onClick={onWebsiteSort}
                    aria-label={'Sort websites'}
                    className={sortModalVisible ? 'border-blue-800' : ''}
                  >
                    {sortModalVisible ? 'Toggle Sort' : 'Sort Websites'}
                  </Button>
                ) : null}
              </div>
            ) : null
          }
        />
        {sortModalVisible ? (
          <SortableWebsiteList refetch={refetch} />
        ) : (
          <div>
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
              emptyHeaderTitle={'Welcome to A11yWatch'}
              emptyHeaderSubTitle={'Add a website to monitor below'}
              activeCrawls={activeCrawls}
            />
            <LoadMoreButton
              visible={websites?.length > 1}
              onLoadMoreEvent={onLoadMoreWebsites}
            />
          </div>
        )}
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
  }
)

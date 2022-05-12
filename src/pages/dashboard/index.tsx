import React, { useCallback, useEffect, useMemo } from 'react'
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
import { useWebsiteContext } from '@app/components/providers/website'
import { WebsiteList } from '@app/components/general/website-list'

function Dashboard({ name }: PageProps) {
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
  } = useWebsiteContext()

  const websites: Website[] = useMemo(() => filterSort(data, search), [
    data,
    search,
  ])

  const { issueSubData } = subscriptionData

  useEffect(() => {
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

  const lhEnabled = websites?.some((web) => web.pageInsights)

  return (
    <>
      <Drawer title={name}>
        <PageTitle
          title={'Websites'}
          rightButton={
            !!data?.length ? (
              <div className='flex flex-wrap gap-x-2 gap-y-1'>
                <FormDialog buttonTitle={`Subscribe`} />
                <Button
                  className={lhEnabled ? 'visible' : 'hidden'}
                  onClick={onLighthouseToggle}
                  aria-label={'Toggle lighthouse reports visibility.'}
                >
                  {lighthouseVisible ? 'Hide' : 'Display'} Lighthouse
                </Button>
                <Button
                  onClick={onRemoveAllWebsitePress}
                  aria-label={'Remove all websites'}
                >
                  Remove All
                </Button>
              </div>
            ) : null
          }
        />
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
        />
      </Drawer>
      <LinearBottom loading={mutatationLoading} />
    </>
  )
}

export default metaSetter(
  { Dashboard },
  {
    intercom: false,
    gql: true,
  }
)

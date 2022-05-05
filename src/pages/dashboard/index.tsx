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
import type { PageProps } from '@app/types'
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
  } = useWebsiteContext()

  const websites = useMemo(() => filterSort(data, search), [data, search])

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

  return (
    <>
      <Drawer title={name}>
        <PageTitle
          title={'Websites'}
          rightButton={
            <div
              className={`flex space-x-2 ${
                !!data?.length ? 'block' : 'hidden'
              }`}
            >
              <Button
                onClick={onRemoveAllWebsitePress}
                className={'min-w-[120px]'}
                aria-label={'Remove all websites'}
              >
                Remove All
              </Button>
              <FormDialog buttonTitle={`Subscribe More`} />
            </div>
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

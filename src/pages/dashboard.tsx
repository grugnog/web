/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { useEffect, useMemo } from 'react'
import { Button, Fade } from '@material-ui/core'
import {
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

  const { issueSubData } = subscriptionData

  const websites = useMemo(() => filterSort(data, search), [data, search])

  useEffect(() => {
    if (issueSubData && events && !events?.firstAdd) {
      setEvents({
        firstAdd: true,
      })
    }
  }, [issueSubData, events, setEvents])

  return (
    <>
      <Drawer title={name}>
        <PageTitle
          title={'Websites'}
          rightButton={
            <Fade in={!!data?.length}>
              <div className={'flex space-x-2'}>
                <Button
                  onClick={async () => {
                    if (
                      window.confirm(
                        'Are you sure you want to remove all websites?'
                      )
                    ) {
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
                  }}
                  variant={'outlined'}
                  color={'primary'}
                  aria-label={'Remove all websites'}
                >
                  Remove All
                </Button>
                <FormDialog buttonTitle={`Subscribe More`} />
              </div>
            </Fade>
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
    intercom: true,
    gql: true,
  }
)

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Button, Fade } from '@material-ui/core'
import {
  PageTitle,
  LinearBottom,
  Drawer,
  FormDialog,
} from '@app/components/general'
import { useDynamicModal, useSearchFilter, useEvents } from '@app/data'
import { filterSort } from '@app/lib'
import { WithHydrate } from '@app/components/adhoc'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { setCookie, getCookie } from 'with-cookie'
import { _ONBOARDED } from '@app/lib/cookies/names'
import { ModalType } from '@app/data/enums'
import { useWebsiteContext } from '@app/components/providers/website'
import { ListSkeleton } from '@app/components/placeholders'

export const noSSR = {
  ssr: false,
}

const WebsiteList = dynamic(
  () =>
    import('@app/components/general/website-list').then(
      (mod) => mod.WebsiteList
    ) as any,
  { loading: () => (<ListSkeleton />) as any, ssr: false }
) as any

const completeOnboarding = () => setCookie(_ONBOARDED, true)

function Dashboard({ name }: PageProps) {
  const { search } = useSearchFilter()
  const { events, setEvents } = useEvents()
  const { setModal } = useDynamicModal()
  const {
    data,
    error,
    loading,
    mutatationLoading,
    removePress,
    refetch,
    crawlWebsite,
    subscriptionData,
  } = useWebsiteContext()

  const { issueSubData } = subscriptionData

  const MAINDATASOURCE = filterSort(data, search)

  useEffect(() => {
    if (issueSubData && events && !events?.firstAdd) {
      setEvents({
        firstAdd: true,
      })
    }
  }, [issueSubData, events, setEvents])

  useEffect(() => {
    const isOnboarded = getCookie(_ONBOARDED, '')

    if (!isOnboarded) {
      setModal({
        open: true,
        modalType: ModalType.onboarding,
        onClose: completeOnboarding,
      })
    }
  }, [setModal])

  return (
    <WithHydrate>
      <Drawer title={name}>
        <PageTitle
          title={'Websites'}
          rightButton={
            <div className={'flex md:space-x-2'}>
              <Fade in={!!data?.length}>
                <div className={'hidden sm:flex'}>
                  <Button
                    onClick={async () => {
                      if (
                        window.confirm(
                          'Are you sure you want to remove all websites?'
                        )
                      ) {
                        await removePress('')
                      }
                    }}
                    variant={'outlined'}
                    color={'primary'}
                    aria-label={'Remove all websites'}
                  >
                    Remove All
                  </Button>
                </div>
              </Fade>
              <FormDialog buttonTitle={'Subscribe more'} />
            </div>
          }
        />
        <WebsiteList
          data={MAINDATASOURCE}
          error={error}
          loading={loading}
          mutatationLoading={mutatationLoading}
          removePress={removePress}
          crawlWebsite={crawlWebsite}
          refetch={refetch}
          setModal={setModal}
          emptyHeaderTitle={'No websites set'}
          emptyHeaderSubTitle={'Add a website to monitor below'}
        />
      </Drawer>
      <LinearBottom loading={mutatationLoading} />
    </WithHydrate>
  )
}

export default metaSetter({ Dashboard })

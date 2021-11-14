/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Button, Fade } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  PageTitle,
  LinearBottom,
  Drawer,
  FormDialog,
} from '@app/components/general'
import { UserManager } from '@app/managers'
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

const useStyles = makeStyles(() => ({
  clear: {
    background: 'transparent',
    boxShadow: 'none',
  },
}))

const completeOnboarding = () => setCookie(_ONBOARDED, true)

function Dashboard({ name }: PageProps) {
  const classes = useStyles()
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
  const MAINDATASOURCE = filterSort(data, search)

  const removePress = async (url?: string, deleteMany: boolean = false) => {
    await removeWebsite({
      variables: {
        url,
        userId: UserManager?.getID,
        deleteMany,
      },
    })
  }

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
  }, []) // eslint-disable-line

  return (
    <WithHydrate>
      <Drawer title={name} bottomButton={FormDialog}>
        <PageTitle
          title={'Websites'}
          rightButton={
            <Fade in={!!data?.length}>
              <Button
                className={classes.clear}
                onClick={async () => await removePress('', true)}
              >
                Remove All
              </Button>
            </Fade>
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
          BottomButton={FormDialog}
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

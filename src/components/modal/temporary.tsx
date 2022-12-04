'use client'

import { useEffect } from 'react'
import { useSearch } from '@app/data'
import { GrClose } from 'react-icons/gr'
import { ReportView } from '@app/components/ada'
import { useRestWebsiteContext } from '../providers/rest/rest-website'
import { HeadlessFullScreenModal } from './headless-full'
import { SnackBar } from '../general'
import { AppManager } from '@app/managers'

interface BottomDrawer {
  website?: any
  bottomModal?: boolean
  closeFeed: () => void
  disablePlayground?: boolean
  disableTabs?: boolean
  authenticated?: boolean
}

export function BottomDrawer({
  bottomModal,
  closeFeed,
  website,
  disablePlayground,
  disableTabs,
  authenticated,
}: BottomDrawer) {
  return (
    <HeadlessFullScreenModal open={!!bottomModal} onClose={closeFeed}>
      <ReportView
        closeButton={
          <button
            className={'text-lg hover:bg-gray-100 rounded-3xl px-3 py-3'}
            aria-label='close modal'
            onClick={closeFeed}
          >
            <GrClose />
          </button>
        }
        authenticated={authenticated}
        website={website}
        disableTabs={disableTabs}
        disablePlayground={disablePlayground}
        download={false}
      />
      <SnackBar snackID={'message-report'} />
    </HeadlessFullScreenModal>
  )
}

export function SwipeableTemporaryDrawer() {
  const { bottomModal, website, closeFeed } = useSearch()

  return (
    <BottomDrawer
      bottomModal={bottomModal}
      closeFeed={closeFeed}
      website={website}
    />
  )
}

// rest component to get website data
export function MarketingBottomTemporaryDrawer({
  authenticated,
}: {
  authenticated?: boolean
}) {
  const { data, loading, closeModal, search } = useRestWebsiteContext()
  const websiteData = data ? { ...data, url: search } : { url: search }

  const visible = (loading && !data) || !!data

  useEffect(() => {
    AppManager.setModalActive(visible)

    return () => {
      AppManager.setModalActive(false)
    }
  }, [visible])

  return (
    <BottomDrawer
      bottomModal={visible}
      closeFeed={closeModal}
      website={websiteData}
      disablePlayground
      disableTabs
      authenticated={authenticated}
    />
  )
}

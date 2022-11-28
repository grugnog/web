'use client'

import { Drawer } from '@material-ui/core'
import { useSearch } from '@app/data'
import { GrClose } from 'react-icons/gr'
import { ReportView } from '@app/components/ada'
import { useRestWebsiteContext } from '../providers/rest/rest-website'

interface BottomDrawer {
  website?: any
  bottomModal?: boolean
  closeFeed?: () => void
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
    <Drawer anchor='bottom' open={bottomModal} onClose={closeFeed}>
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
    </Drawer>
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

  return (
    <BottomDrawer
      bottomModal={(loading && !data) || !!data}
      closeFeed={closeModal}
      website={websiteData}
      disablePlayground
      disableTabs
      authenticated={authenticated}
    />
  )
}

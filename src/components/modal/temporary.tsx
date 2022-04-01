import React, { memo } from 'react'
import { Drawer, IconButton } from '@material-ui/core'
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
}

export function BottomDrawerComponent({
  bottomModal,
  closeFeed,
  website,
  disablePlayground,
  disableTabs,
}: BottomDrawer) {
  return (
    <Drawer anchor='bottom' open={bottomModal} onClose={closeFeed}>
      <ReportView
        closeButton={
          <IconButton aria-label='close modal' onClick={closeFeed}>
            <GrClose />
          </IconButton>
        }
        website={website}
        disableTabs={disableTabs}
        disablePlayground={disablePlayground}
      />
    </Drawer>
  )
}

export const BottomDrawer = memo(BottomDrawerComponent)

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
export function MarketingBottomTemporaryDrawer() {
  const { data, loading, closeModal, search } = useRestWebsiteContext()
  const websiteData = { ...data, url: search }

  return (
    <BottomDrawer
      bottomModal={(loading && !data) || !!data}
      closeFeed={closeModal}
      website={websiteData}
      disablePlayground
      disableTabs
    />
  )
}

import React, { memo } from 'react'
import { Drawer, IconButton } from '@material-ui/core'
import { useSearch } from '@app/data'
import { GrClose } from 'react-icons/gr'
import { ReportView } from '@app/components/ada'

interface BottomDrawer {
  website?: any
  bottomModal?: boolean
  closeFeed?: () => void
}

export function BottomDrawerComponent({
  bottomModal,
  closeFeed,
  website,
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

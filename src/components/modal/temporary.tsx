import React, { useCallback } from 'react'
import { Drawer, IconButton } from '@material-ui/core'
import { useSearch } from '@app/data'
import { Close as CloseIcon } from '@material-ui/icons'
import { ReportView } from '@app/components/ada'

// TODO: CREATE REACT-CONTEXT VERSION
export function SwipeableTemporaryDrawer() {
  const { bottomModal, website, toggleModal } = useSearch()

  const toggleDrawer = useCallback(
    (bottom: boolean) => () => {
      toggleModal(bottom, '')
    },
    [toggleModal]
  )

  return (
    <Drawer anchor='bottom' open={bottomModal} onClose={toggleDrawer(false)}>
      <ReportView
        closeButton={
          <IconButton aria-label='close modal' onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        }
        website={website}
      />
    </Drawer>
  )
}

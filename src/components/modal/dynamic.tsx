import React, { memo } from 'react'
import { Backdrop, Modal } from '@material-ui/core'
import { useDynamicModal } from '@app/data'
import { GetType } from './helpers'
import { makeStyles } from '@material-ui/core/styles'
import { dynamicModalHandler } from '@app/data/models/singletons/modalHandler'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  paper: {
    backgroundColor: 'transparent',
    boxShadow: theme.shadows[5],
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.divider,
    },
  },
}))

export function DynamicModalWrapper() {
  const classes = useStyles()
  const { modelData, setModal } = useDynamicModal()
  const { open, modalType } = modelData

  const onClose = () => {
    if (typeof dynamicModalHandler?.onClose === 'function') {
      dynamicModalHandler.onClose()
    }
    setModal({ open: false })
  }

  return (
    <Modal
      aria-labelledby='dynamic-modal-title'
      aria-describedby='dynamic-modal-description'
      className={classes.modal}
      open={!!open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
    >
      <div className={open ? 'visible' : 'hidden'}>
        <div className={classes.paper}>
          <GetType modalType={modalType} />
        </div>
      </div>
    </Modal>
  )
}

export const DynamicModal = memo(DynamicModalWrapper)

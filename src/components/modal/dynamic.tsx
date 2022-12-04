import { memo } from 'react'
import { useDynamicModal } from '@app/data'
import { GetType } from './helpers'
import { dynamicModalHandler } from '@app/data/models/singletons/modalHandler'
import { HeadlessModal } from './headless'

export function DynamicModalWrapper() {
  const { modelData, setModal } = useDynamicModal()
  const { open, modalType } = modelData

  const onClose = () => {
    if (typeof dynamicModalHandler?.onClose === 'function') {
      dynamicModalHandler.onClose()
    }
    setModal({ open: false })
  }

  return (
    <HeadlessModal open={!!open} onClose={onClose}>
      <div>
        <GetType modalType={modalType} />
      </div>
    </HeadlessModal>
  )
}

export const DynamicModal = memo(DynamicModalWrapper)

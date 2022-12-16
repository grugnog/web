'use client'

import { useCallback, useEffect, useState } from 'react'
import { isSameDay } from 'date-fns'
import { checkNotification } from '@app/lib'
import { dynamicModalHandler } from '@app/data/models/singletons/modalHandler'
import { ModalType } from '@app/data/enums'
import { _ONBOARDED } from '@app/lib/cookies/names'

export const defaultProps = {
  open: false,
  modalType: ModalType.empty,
  url: '',
}

const completeOnboarding = () => localStorage.setItem(_ONBOARDED, 'true')

const getLastAlertedDate = () => {
  if (typeof localStorage !== 'undefined') {
    const alertPromptDate = localStorage.getItem('AlertPromptDate')
    const notificationsEnabled = checkNotification()
    const alertedDate = (alertPromptDate && new Date(alertPromptDate)) || null

    if (
      !notificationsEnabled &&
      alertedDate &&
      !isSameDay(alertedDate, new Date())
    ) {
      localStorage.setItem('AlertPromptDate', new Date() + '')
      return true
    }
  }
  return false
}

export function useDynamicModal() {
  const [data, writeData] = useState<typeof defaultProps>(defaultProps)

  const setModal = useCallback(
    ({ open = true, modalType = ModalType.empty, onClose, url = '' }: any) => {
      if (!open && typeof dynamicModalHandler?.onClose === 'function') {
        dynamicModalHandler.onClose()
      }
      if (onClose) {
        dynamicModalHandler.bindOnClose(onClose)
      }
      writeData({ open, modalType, url })
    },
    [writeData]
  )

  // get first time alerts and other app notifications
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const a = getLastAlertedDate()

      if (a) {
        setModal({ open: true, modalType: ModalType.alerts })
      } else if (!localStorage.getItem(_ONBOARDED)) {
        // Possible check route for only displaying on dashboard for future links to auth pages
        setModal({
          open: true,
          modalType: ModalType.onboarding,
          onClose: completeOnboarding,
        })
      }
    }
  }, [setModal])

  return {
    modelData: data,
    setModal,
    dynamicModalHandler,
  }
}

import { useEffect, useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { isSameDay } from 'date-fns'
import { checkNotification } from '@app/lib'
import { dynamicModalHandler } from '@app/data/models/singletons/modalHandler'
import { ModalType } from '@app/data/enums'
import { _ONBOARDED } from '@app/lib/cookies/names'

const GET_DYNAMIC_MODAL_STATE = gql`
  query getDynamicModalState {
    modal @client {
      open
      modalType
      url
    }
  }
`

const defaultProps = {
  open: false,
  modalType: ModalType.empty,
  url: '',
}

const getLastAlertedDate = (setModal: (x: any) => void) => {
  if (typeof localStorage !== 'undefined') {
    const alertPromptDate = localStorage.getItem('AlertPromptDate')
    const notificationsEnabled = checkNotification()
    const alertedDate = (alertPromptDate && new Date(alertPromptDate)) || null

    if (
      !notificationsEnabled &&
      alertedDate &&
      !isSameDay(alertedDate, new Date())
    ) {
      setModal && setModal({ open: true, modalType: ModalType.alerts })
      localStorage.setItem('AlertPromptDate', new Date() + '')
    }
  }
}

export function useDynamicModal() {
  const { data, client } = useQuery(GET_DYNAMIC_MODAL_STATE, { ssr: false })
  const modelData = data?.modal || defaultProps

  const setModal = useCallback(
    ({ open = true, modalType = ModalType.empty, onClose, url = '' }: any) => {
      if (!open && typeof dynamicModalHandler?.onClose === 'function') {
        dynamicModalHandler.onClose()
      }
      if (onClose) {
        dynamicModalHandler.bindOnClose(onClose)
      }

      client.writeData({
        data: {
          modal: { open, modalType, url, __typename: 'DynamicModal' },
        },
      })
    },
    [client]
  )

  useEffect(() => {
    getLastAlertedDate(setModal)
    if (typeof localStorage !== 'undefined') {
      const isOnboarded = localStorage.getItem(_ONBOARDED)

      if (!isOnboarded) {
        const completeOnboarding = () =>
          localStorage.setItem(_ONBOARDED, 'true')
        // Possible check route for only displaying on dashboard for future links to auth pages
        setModal({
          open: true,
          modalType: ModalType.onboarding,
          onClose: completeOnboarding,
        })
      }
    }
  }, [setModal, client])

  return {
    modelData,
    setModal,
    dynamicModalHandler,
  }
}

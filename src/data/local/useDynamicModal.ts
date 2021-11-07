/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useEffect } from 'react'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { isSameDay } from 'date-fns'
import { checkNotification } from '@app/lib'
import { dynamicModalHandler } from '@app/data/models/singletons/modalHandler'
import { ModalType } from '@app/data/enums'

const GET_DYNAMIC_MODAL_STATE = gql`
  query getDynamicModalState {
    modal @client {
      open
      modalType
      url
      html
    }
  }
`

const defaultProps = {
  open: false,
  modalType: ModalType.empty,
  url: '',
  html: '',
}

const getLastAlertedDate = async (setModal: any) => {
  if (typeof localStorage !== 'undefined') {
    const alertPromptDate = await localStorage.getItem('AlertPromptDate')
    const notificationsEnabled = checkNotification()
    const alertedDate = (alertPromptDate && new Date(alertPromptDate)) || null

    if (
      !notificationsEnabled &&
      alertedDate &&
      !isSameDay(alertedDate, new Date())
    ) {
      setModal({ open: true, modalType: ModalType.alerts })
      localStorage.setItem('AlertPromptDate', new Date() + '')
    }
  }
}

export function useDynamicModal() {
  const client = useApolloClient()
  const { data } = useQuery(GET_DYNAMIC_MODAL_STATE)
  const modelData = data?.modal || defaultProps

  const setModal = ({
    open = true,
    modalType = ModalType.empty,
    onClose,
    url = '',
    html = '',
  }: any) => {
    if (dynamicModalHandler) {
      dynamicModalHandler.bindOnClose(onClose)
    }

    client.writeData({
      data: {
        modal: { open, modalType, url, html, __typename: 'DynamicModal' },
      },
    })
  }

  useEffect(() => {
    getLastAlertedDate(setModal)
  }, [])

  return {
    modelData,
    setModal,
    dynamicModalHandler,
  }
}

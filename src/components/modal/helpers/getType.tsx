import React from 'react'
import { EnableNotifications } from '@app/components/alerts'
import { Onboarding } from '@app/components/alerts/onboarding'
import { ModalType } from '@app/data/enums'

export const GetType = ({ modalType }: any) => {
  switch (modalType) {
    case ModalType.empty: {
      return null
    }
    case ModalType.alerts: {
      return <EnableNotifications />
    }
    case ModalType.onboarding: {
      return <Onboarding />
    }
    default: {
      return null
    }
  }
}

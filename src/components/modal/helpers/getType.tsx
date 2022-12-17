import React from 'react'
import { EnableNotifications } from '@app/components/alerts'
import { Onboarding } from '@app/components/alerts/onboarding'
import { ModalType } from '@app/data/enums'
import { LineChart } from '@app/components/general/charts/line-chart'

type ModalTypeBaseProps = {
  modalType: ModalType
  data?: any // todo: set exact types
}

export const GetType = ({ modalType, data }: ModalTypeBaseProps) => {
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
    case ModalType.analytics: {
      return <LineChart data={data} />
    }
    default: {
      return null
    }
  }
}

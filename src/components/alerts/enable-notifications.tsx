import React from 'react'
import { strings } from '@app-strings'
import { enableNotifications } from '@app/lib'
import { GrNotification } from 'react-icons/gr'
import { Header3 } from '../general/header'
import { Button } from '../general'
import { useInteractiveContext } from '../providers/interactive'
import { ModalType } from '@app/data/enums'

export function EnableNotifications() {
  const { setModal } = useInteractiveContext()

  const onOkPressEvent = () => {
    setModal({ open: false, modalType: ModalType.empty, url: "" })
    enableNotifications()
  }

  const onNotNowEvent = () => {
    setModal({ open: false, modalType: ModalType.empty, url: "" })
  }

  return (
    <div className={'px-4 py-4 space-y-4'}>
      <div className='gap-y-3'>
        <GrNotification fontSize='large' />
        <Header3>{strings.alerts.enableNotificationsTitle}</Header3>
        <p className={`text-sm pb-2`}>
          {strings.alerts.enableNotificationsDetail}
        </p>
      </div>
      <div className='space-x-3'>
        <Button
          onClick={onOkPressEvent}
          className={`border-blue-700 text-blue-700`}
        >
          {strings.alerts.okay}
        </Button>
        <Button className={'bg-transparent border-0'} onClick={onNotNowEvent}>
          {strings.alerts.notNow}
        </Button>
      </div>
    </div>
  )
}

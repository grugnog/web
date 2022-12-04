import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { strings } from '@app-strings'
import { useDynamicModal } from '@app/data'
import { _ONBOARDED } from '@app/lib/cookies/names'
import { GrNotification } from 'react-icons/gr'
import { Button } from '../general'
import { Header3 } from '../general/header'

export function Onboarding() {
  const router = useRouter()
  const { setModal } = useDynamicModal()

  const onTakePress = useCallback(async () => {
    setModal({ open: false })
    await router.push('/alerts', '/alerts')
  }, [setModal, router])

  const onClose = useCallback(async () => {
    setModal({ open: false })
  }, [setModal])

  return (
    <div className={'px-4 py-4 space-y-4'}>
      <div className='gap-y-3'>
        <GrNotification fontSize='large' />
        <Header3>{strings.onboarding.limitEmailsTitle}</Header3>
        <p className='text-sm'>{strings.onboarding.limitEmailsDetail}</p>
      </div>
      <div className='space-x-3'>
        <Button
          onClick={onTakePress}
          className={`border-blue-700 text-blue-700`}
        >
          Take me there
        </Button>
        <Button className={'bg-transparent border-0'} onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  )
}

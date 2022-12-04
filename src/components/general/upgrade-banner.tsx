import { useEffect, useState } from 'react'
import { UserManager } from '@app/managers'
import { Link } from './link'

const UpgradeBanner = () => {
  const [needsUpdate, setUpgrade] = useState<boolean>(false)

  useEffect(() => {
    setUpgrade(UserManager.freeAccount)
  }, [setUpgrade])

  return needsUpdate ? (
    <div className='hidden md:block'>
      <div className='h-20' />
      <div className={'p-3 z-10 w-full flex place-content-center'}>
        <div className={'text-sm md:text-normal text-gray-600 font-semibold'}>
          Upgrade your account to add multiple websites, multi page lighthouse
          reports, custom script fixes, and more.{' '}
          <Link href={'/payments'} style={{ color: '#3b82f6' }}>
            UPGRADE
          </Link>
        </div>
      </div>
    </div>
  ) : null
}

export { UpgradeBanner }

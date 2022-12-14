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
        <div className={'text-sm md:text-normal text-gray-600 font-medium'}>
        <Link href={'/payments'} style={{ color: '#3b82f6', lineHeight: 1 }} className={"p-0 text-sm"}>
            Upgrade
          </Link> your account to add up to 50 websites, site-wide monitoring, multi page lighthouse
          reports, CDN scripts, and more.
        </div>
      </div>
    </div>
  ) : null
}

export { UpgradeBanner }

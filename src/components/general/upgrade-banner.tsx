import React from 'react'
import { UserManager } from '@app/managers'
import { Link } from './link'

const styles = {
  container: 'p-3 z-1 w-full flex place-content-center',
  text: 'text-sm md:text-normal text-black font-semibold',
}

const UpgradeBanner = () => {
  // TODO: MOBILE VISUAL UPGRADE ICON
  return UserManager.freeAccount ? (
    <div className='invisible md:visible'>
      <div className='h-20' />
      <div className={styles.container}>
        <div className={styles.text}>
          Upgrade your account to add multiple websites, edit scripts, and more{' '}
          <Link
            href={'/payments'}
            style={{ fontWeight: 600, color: '#3b82f6' }}
          >
            UPGRADE
          </Link>
          .
        </div>
      </div>
    </div>
  ) : null
}

export { UpgradeBanner }

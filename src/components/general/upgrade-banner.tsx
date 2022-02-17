/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { UserManager } from '@app/managers'
import { Link } from './link'

const styles = {
  container:
    'fixed bottom-0 left-0 right-0 p-2 z-1 w-full flex place-content-center bg-white',
  text: 'text-black font-semibold',
}

const UpgradeBanner = (): any => {
  return UserManager.freeAccount ? (
    <div className={styles.container}>
      <div className={styles.text}>
        Upgrade your account to add multiple websites, edit scripts, and more{' '}
        <Link href={'/payments'} style={{ fontWeight: 600 }}>
          UPGRADE
        </Link>
      </div>
    </div>
  ) : null
}

export { UpgradeBanner }

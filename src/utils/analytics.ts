/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { getAPIRoute } from '@app/configs'
import { hasWindow } from '@app/lib'
import { UserManager } from '@app/managers'

export const logPageView = (route?: string, refer?: boolean) => {
  const browser = hasWindow()
  const apiPath = getAPIRoute()

  const page = String(route || (browser && window.location.pathname))

  const analyticsData = {
    page,
    userID: UserManager.getID,
    screenResolution: browser && window?.innerWidth,
    documentReferrer: refer
      ? typeof document !== 'undefined' && document?.referrer
      : undefined,
  }

  if (apiPath) {
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const beaconData = new Blob([JSON.stringify(analyticsData)], {
        type: 'application/json',
      })

      navigator.sendBeacon(`${apiPath}/log/page`, beaconData)
    } else if (browser && window.fetch) {
      fetch(`${apiPath}/log/page`, {
        method: 'POST',
        body: JSON.stringify(analyticsData),
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}

export const ping = () => {
  const browser = hasWindow()
  const apiPath = getAPIRoute()

  if (apiPath) {
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon(`${apiPath}/ping`)
    } else if (browser && window.fetch) {
      fetch(`${apiPath}/ping`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}

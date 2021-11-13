/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { getAPIRoute } from '@app/configs'
import { UserManager } from '@app/managers'

export const logPageView = (route?: string, refer?: boolean) => {
  const page = String(
    route || (typeof window !== 'undefined' && window.location.pathname)
  )
  const analyticsData = {
    page,
    userID: UserManager.getID,
    screenResolution: typeof window !== 'undefined' && window?.innerWidth,
    documentReferrer: refer
      ? typeof document !== 'undefined' && document.referrer
      : undefined,
  }

  const apiPath = getAPIRoute()

  if (apiPath) {
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const beaconData = new Blob([JSON.stringify(analyticsData)], {
        type: 'application/json',
      })

      navigator.sendBeacon(`${getAPIRoute()}/log/page`, beaconData)
    } else if (typeof window !== 'undefined' && window.fetch) {
      fetch(`${getAPIRoute()}/log/page`, {
        method: 'POST',
        body: JSON.stringify(analyticsData),
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}

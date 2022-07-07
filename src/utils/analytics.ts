import { getAPIRoute } from '@app/configs'
import { hasWindow } from '@app/lib'
import { UserManager } from '@app/managers'

export const ping = () => {
  const browser = hasWindow()
  const apiPath = getAPIRoute()

  if (apiPath && UserManager.loggedIn) {
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

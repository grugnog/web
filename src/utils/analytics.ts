import { getAPIRoute } from '@app/configs'
import { hasWindow } from '@app/lib'
import { UserManager } from '@app/managers'

const apiPath = `${getAPIRoute()}/ping`

// initial app ping
export const ping = async () => {
  const browser = hasWindow()

  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    navigator.sendBeacon(apiPath)
  } else if (browser && fetch) {
    try {
      await fetch(apiPath, {
        method: 'POST',
        headers: {
          authorization: UserManager.token,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }
}

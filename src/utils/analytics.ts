import { getAPIRoute } from '@app/configs'
import { hasWindow } from '@app/lib'

// initial app ping
export const ping = async () => {
  const browser = hasWindow()
  const apiPath = `${getAPIRoute()}/ping`

  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    navigator.sendBeacon(apiPath)
  } else if (browser && fetch) {
    try {
      await fetch(apiPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (e) {
      console.error(e)
    }
  }
}

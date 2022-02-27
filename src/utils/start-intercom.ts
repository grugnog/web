import { loadIntercom } from 'next-intercom'
import { userModel } from '@app/data'
import { INTERCOM_APPID, INTERCOM_ENABLED } from '@app/configs'
import { domInteractive } from './dom-load-time'

let BLOCK = 0

export function startIntercom() {
  // Prevent intercom from injecting twice
  if (
    BLOCK ||
    !INTERCOM_APPID ||
    (typeof INTERCOM_ENABLED !== 'undefined' && !INTERCOM_ENABLED)
  ) {
    return
  }
  const email = userModel?.email
  const dtime = userModel.isMobile ? 8000 : 5000

  window.onload = () => {
    setTimeout(() => {
      loadIntercom({
        appId: INTERCOM_APPID,
        email,
        name: email,
        scriptType: 'defer',
      })
      BLOCK = 1
    }, domInteractive() + dtime)
  }
}

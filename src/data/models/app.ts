import { dev } from '@app/configs'

type AppModel = {
  pwaInstalled: boolean
}

const appModel: AppModel = {
  pwaInstalled: false,
}

const installed = 'appinstalled'

function setPwaInstalled(event?: Event) {
  appModel.pwaInstalled = true
  if (event) {
    window.removeEventListener(installed, setPwaInstalled)
  }
}

async function initAppModel() {
  if (!dev && typeof window !== 'undefined') {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setPwaInstalled()
    } else if (!appModel.pwaInstalled && 'serviceWorker' in navigator) {
      try {
        // const { registerSW } = await import('@app/lib/register-sw')
        // await registerSW({
        //   __PWA_START_URL__: 'true',
        //   __PWA_SW__: '',
        //   __PWA_SCOPE__: '/',
        //   __PWA_ENABLE_REGISTER__: 'true',
        //   __PWA_CACHE_ON_FRONT_END_NAV__: 'true',
        //   __PWA_RELOAD_ON_ONLINE__: '',
        // })

        window.addEventListener(installed, setPwaInstalled)
      } catch (e) {
        console.error('cannot set pwa')
      }
    }
  }
}

export { appModel, initAppModel }

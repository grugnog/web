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

function initAppModel() {
  if (!dev && typeof window !== 'undefined') {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setPwaInstalled()
    } else if (!appModel.pwaInstalled && 'serviceWorker' in navigator) {
      try {
        window.addEventListener(installed, setPwaInstalled)
      } catch (e) {
        console.error('cannot set pwa')
      }
    }
  }
}

export { appModel, initAppModel }

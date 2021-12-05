import { Workbox } from 'workbox-window'

interface PWAOptions {
  __PWA_START_URL__?: string
  __PWA_SW__?: string
  __PWA_SCOPE__?: string
  __PWA_ENABLE_REGISTER__: string
  __PWA_CACHE_ON_FRONT_END_NAV__: string
  __PWA_RELOAD_ON_ONLINE__: string
}

declare global {
  interface Window {
    workbox: any
  }
}

const registerSW = (options: PWAOptions) => {
  const {
    __PWA_START_URL__,
    __PWA_SCOPE__,
    __PWA_SW__,
    __PWA_ENABLE_REGISTER__,
    __PWA_CACHE_ON_FRONT_END_NAV__,
    __PWA_RELOAD_ON_ONLINE__,
  } = options ?? {}

  if (!options) {
    return
  }

  if (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    typeof caches !== 'undefined'
  ) {
    if (__PWA_START_URL__) {
      caches.has('start-url').then(function (has) {
        if (!has) {
          caches
            .open('start-url')
            .then((c) =>
              c.put(__PWA_START_URL__, new Response('', { status: 200 }))
            )
        }
      })
    }

    window.workbox = new Workbox(__PWA_SW__ || '', { scope: __PWA_SCOPE__ })

    if (__PWA_START_URL__) {
      window.workbox.addEventListener(
        'installed',
        async ({ isUpdate }: { isUpdate: boolean }) => {
          if (!isUpdate) {
            const cache = await caches.open('start-url')
            const response = await fetch(__PWA_START_URL__)
            let _response = response
            if (response.redirected) {
              _response = new Response(response.body, {
                status: 200,
                statusText: 'OK',
                headers: response.headers,
              })
            }

            await cache.put(__PWA_START_URL__, _response)
          }
        }
      )
    }

    window.workbox.addEventListener('installed', async () => {
      const data = window.performance
        .getEntriesByType('resource')
        .map((e) => e.name)
        .filter(
          (n) =>
            n.startsWith(`${window.location.origin}/_next/data/`) &&
            n.endsWith('.json')
        )
      const cache = await caches.open('next-data')
      data.forEach((d) => cache.add(d))
    })

    if (__PWA_ENABLE_REGISTER__) {
      window.workbox.register()
    }

    if (__PWA_CACHE_ON_FRONT_END_NAV__ || __PWA_START_URL__) {
      const cacheOnFrontEndNav = function (url: string) {
        if (!window.navigator.onLine) return
        if (__PWA_CACHE_ON_FRONT_END_NAV__ && url !== __PWA_START_URL__) {
          return caches.open('others').then((cache) =>
            cache.match(url, { ignoreSearch: true }).then((res) => {
              if (!res) return cache.add(url)
              return Promise.resolve()
            })
          )
        } else if (__PWA_START_URL__ && url === __PWA_START_URL__) {
          return fetch(__PWA_START_URL__).then(function (response) {
            if (!response.redirected) {
              return caches
                .open('start-url')
                .then((cache) => cache.put(__PWA_START_URL__, response))
            }
            return Promise.resolve()
          })
        }
      }

      const pushState = history.pushState
      history.pushState = function () {
        // @ts-ignore
        pushState.apply(history, arguments)
        cacheOnFrontEndNav(arguments[2])
      }

      const replaceState = history.replaceState
      history.replaceState = function () {
        // @ts-ignore
        replaceState.apply(history, arguments)
        cacheOnFrontEndNav(arguments[2])
      }

      window.addEventListener('online', () => {
        cacheOnFrontEndNav(window.location.pathname)
      })
    }

    if (__PWA_RELOAD_ON_ONLINE__) {
      window.addEventListener('online', () => {
        location.reload()
      })
    }
  }
}

export { registerSW }

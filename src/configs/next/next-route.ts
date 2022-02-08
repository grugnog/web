import type { NextRequest } from 'next/server'

const ignoreList = ['/_offline', '/robots.txt', 'fallback', 'workbox']

const getRouteType = (req: NextRequest) => {
  const { pathname } = req.nextUrl
  const staticResource =
    req.url.includes('/static/') ||
    pathname.includes('.') ||
    pathname.includes('/src/') ||
    pathname.includes('/workbox-')
  pathname === '/_offline' ||
    req.page.name === '/_offline' ||
    pathname.includes('/sw.js') ||
    pathname === '/robots.txt'

  const pageRequest =
    req.page.name &&
    !ignoreList.includes(req.url) &&
    !pathname.startsWith('/api')

  return { staticResource, pageRequest }
}

export { getRouteType }

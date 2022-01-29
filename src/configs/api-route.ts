import type { NextRequest } from 'next/server'

const API_ENDPOINT =
  (process.env.API && String(process.env.API).replace('/graphql', '/api')) ||
  'http://localhost:8080/api'

const getAPIRoute = (type: 'api' | 'graphql' = 'api', middleware?: boolean) => {
  const endpoint = API_ENDPOINT ? API_ENDPOINT.replace('graphql', type) : ''

  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.DOCKER_CONTAINER &&
    middleware
  ) {
    return endpoint.replace('localhost', 'api')
  }

  return endpoint
}

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

export { API_ENDPOINT, getAPIRoute, getRouteType }

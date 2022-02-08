import type { NextRequest } from 'next/server'

const isWhitelisted = (req: NextRequest) => {
  const { pathname } = req.nextUrl
  const pageName = req?.page?.name

  return (
    req.url.includes('/static/') ||
    pathname.includes('.') ||
    pathname.startsWith('/src/') ||
    pathname.startsWith('/workbox-') ||
    pathname.startsWith('/api/') ||
    pathname.includes('/sw.js') ||
    pathname === '/robots.txt' ||
    pageName === '/_offline'
  )
}

export { isWhitelisted }

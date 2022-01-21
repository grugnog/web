import type { NextRequest, NextFetchEvent } from 'next/server'
import { NextResponse } from 'next/server'
import { LOGGIN_ROUTES, SHARED_ROUTES } from '@app/configs/routes'
import { getAPIRoute } from '@app/configs/api-route'

const ID_COOKIE_NAME = 'uuid'
const JWT_COOKIE_NAME = 'jwt'

const ignoreList = ['/_offline', '/robots.txt', 'fallback', 'workbox']
const API_ROUTE = getAPIRoute('api', true)
const VERCEL_COOKIE = `_vercel_`

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  // const noRedirects = req.nextUrl.searchParams.get('noredirect')
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

  let res = NextResponse.next()

  if (staticResource || req.cookies[`${VERCEL_COOKIE}${JWT_COOKIE_NAME}`]) {
    return res
  }

  const token = req.cookies[JWT_COOKIE_NAME]
  let uuid = req.cookies[ID_COOKIE_NAME]

  const hostname = req.headers.get('host')

  const currentHost =
    process.env.NODE_ENV == 'production'
      ? hostname?.replace(`.${process.env.ROOT_URL}`, '')
      : process.env.CURR_HOST

  const pageRequest =
    req.page.name &&
    !ignoreList.includes(req.url) &&
    !pathname.startsWith('/api')

  if (!uuid) {
    uuid = crypto.randomUUID!()
  }

  if (pageRequest) {
    event.waitUntil(
      (async () => {
        const analyticsData = {
          page: req.page.name,
          userID: uuid,
          screenResolution: undefined,
          documentReferrer: req.referrer,
          ip: req.ip,
          _ga: req.cookies['_ga'],
          geo: req.geo,
        }

        const headers = {
          'Content-Type': 'application/json',
          'User-Agent': '',
          Origin: req.nextUrl.origin || 'https://a11ywatch.com',
        }

        if (req?.ua?.ua) {
          headers['User-Agent'] = req.ua.ua
        }

        await fetch(`${API_ROUTE}/log/page`, {
          method: 'POST',
          body: JSON.stringify(analyticsData),
          headers,
        }).catch((e) => {
          console.error(e)
        })
      })()
    )
  }

  if (!req.cookies[ID_COOKIE_NAME]) {
    res.cookie(ID_COOKIE_NAME, uuid)
  }

  if (currentHost === 'a11ywatch.blog') {
    return NextResponse.rewrite(`/blog${pathname}`)
  }

  if (!SHARED_ROUTES.includes(req.nextUrl.pathname)) {
    if (token) {
      if (!LOGGIN_ROUTES.includes(req.nextUrl.pathname)) {
        res = NextResponse.redirect('/dashboard')
      }
    } else {
      if (LOGGIN_ROUTES.includes(req.nextUrl.pathname)) {
        res = NextResponse.redirect('/')
      }
    }
  }

  return res
}

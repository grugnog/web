import type { NextRequest, NextFetchEvent } from 'next/server'
import { NextResponse, userAgent } from 'next/server'
import { isWhitelisted } from '@app/configs/next/is-static-resource'
import { logPage } from '@app/request/log-page'

const ID_COOKIE_NAME = 'uuid'
const JWT_COOKIE_NAME = 'jwt'
// coming from vercel
const VERCEL_PREFIX = `_vercel_`

const ROOT_URL = `.${process.env.ROOT_URL}`

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl
  const whiteListed = isWhitelisted({
    pathname,
    url: req.url,
  })
  const token = req.cookies.get(JWT_COOKIE_NAME)

  let res = NextResponse.next()

  // vercel build or static resource ignore middleware
  if (whiteListed || req.cookies.get(`${VERCEL_PREFIX}${JWT_COOKIE_NAME}`)) {
    return res
  }

  const uuid = req.cookies.get(ID_COOKIE_NAME) || crypto.randomUUID!()

  const currentHost = req.headers?.get('host')?.replace(ROOT_URL, '')

  if (/.blog/.test(currentHost + '')) {
    const url = req.nextUrl.clone()
    url.pathname = `/blog${req.nextUrl.pathname}`
    res = NextResponse.rewrite(url)
  }

  if (token && req.nextUrl.pathname === '/') {
    const url = req.nextUrl.clone()
    url.pathname = `/dashboard${req.nextUrl.pathname}`
    res = NextResponse.rewrite(url)
  }

  if (!req.cookies.get(ID_COOKIE_NAME)) {
    res.cookies.set(ID_COOKIE_NAME, uuid, {
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
    })
  }

  event.waitUntil(
    (async () => {
      const ua = userAgent(req)
      if (!ua?.isBot) {
        try {
          await logPage(req, uuid, ua)
        } catch (e) {
          console.error(e)
        }
      } else {
        Promise.resolve()
      }
    })()
  )

  return res
}

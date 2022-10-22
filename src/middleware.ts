import { NextResponse, NextRequest, userAgent } from 'next/server'
import { isWhitelisted } from '@app/configs/next/is-static-resource'
import { IFRAME_ENDPOINT } from '@app/configs/next/iframe'

const JWT_COOKIE_NAME = 'jwt'
// coming from vercel
const VERCEL_PREFIX = `_vercel_`

const ROOT_URL = `.${process.env.ROOT_URL}`

export async function middleware(req: NextRequest) {
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

  const currentHost = req.headers?.get('host')?.replace(ROOT_URL, '')

  if (/.blog/.test(currentHost + '')) {
    const url = req.nextUrl.clone()
    url.pathname = `/blog${req.nextUrl.pathname}`
    res = NextResponse.rewrite(url)
  } else if (req.nextUrl.pathname === '/api/iframe' && !userAgent(req).isBot) {
    const { searchParams } = req.nextUrl
    const u = searchParams.get('url')
    const base = searchParams.get('baseHref')

    if (u) {
      const b =
        IFRAME_ENDPOINT +
        `/iframe?url=${encodeURIComponent(u)}&baseHref=${base || true}`

      res = NextResponse.rewrite(b)
    }
  } else if (token && req.nextUrl.pathname === '/') {
    const url = req.nextUrl.clone()
    url.pathname = `/dashboard${req.nextUrl.pathname}`
    res = NextResponse.rewrite(url)
  }

  return res
}

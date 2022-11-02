import { NextResponse, NextRequest, userAgent } from 'next/server'
import { isWhitelisted } from '@app/configs/next/is-static-resource'
import { IFRAME_ENDPOINT } from '@app/configs/next/iframe'

const ROOT_URL = `.${process.env.ROOT_URL}`

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const whiteListed = isWhitelisted({
    pathname,
    url: req.url,
  })

  let res = NextResponse.next()

  // vercel build or static resource ignore middleware
  if (whiteListed || req.cookies.get('_vercel_jwt')) {
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
  }

  return res
}

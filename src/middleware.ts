import { NextResponse, NextRequest, userAgent } from 'next/server'
import { IFRAME_ENDPOINT } from '@app/configs/next/iframe'

const ROOT_URL = `.${process.env.ROOT_URL}`

export async function middleware(req: NextRequest) {
  let res = NextResponse.next()

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

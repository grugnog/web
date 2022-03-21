import { NextResponse } from 'next/server'
import { ipRateLimit } from '@app/lib/limiter/ip-rate-limit'
import { iframe } from '@app/lib/iframe'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/api/logout') {
    const url = req.nextUrl.clone()
    url.pathname = '/'
    const res = NextResponse.redirect(url)
    res.clearCookie('jwt')
    return res
  }
  if (req.nextUrl.pathname === '/api/iframe') {
    // IF UPSTASH EXIST APPLY RATE LIMIT
    if (process.env.UPSTASH_REST_API_TOKEN) {
      const rl = await ipRateLimit(req)

      if (rl.status !== 200) {
        return rl
      }
    }

    const iframeSource = await iframe(
      req.nextUrl.searchParams.get('url') || '',
      req.nextUrl.searchParams.get('baseHref') || ''
    )

    return new NextResponse(iframeSource, {
      headers: { 'Content-Type': 'text/html' },
    })
  }
}

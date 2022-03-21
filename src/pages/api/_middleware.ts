import { NextResponse } from 'next/server'
import { ipRateLimit } from '@app/lib/limiter/ip-rate-limit'
import { iframe } from '@app/lib/iframe'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/api/iframe') {
    if (process.env.UPSTASH_REST_API_TOKEN) {
      try {
        const rl = await ipRateLimit(req)

        if (rl.status !== 200) {
          return rl
        }
      } catch (e) {
        console.error(e)
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

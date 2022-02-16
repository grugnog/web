import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { ipRateLimit } from '@app/lib/limiter/ip-rate-limit'

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/api/iframe') {
    const res = await ipRateLimit(req)

    if (res.status !== 200) {
      return res
    }

    return NextResponse.next()
  }
}

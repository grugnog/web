import { NextResponse } from 'next/server'
import { iframe } from '@app/lib/iframe'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/api/iframe') {
    let iframeSource
    try {
      iframeSource = await iframe(
        req.nextUrl.searchParams.get('url') || '',
        req.nextUrl.searchParams.get('baseHref') || ''
      )
    } catch (e) {
      console.error(e)
    }

    return new NextResponse(iframeSource ?? undefined, {
      headers: { 'Content-Type': 'text/html' },
    })
  }
}

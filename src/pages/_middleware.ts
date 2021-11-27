import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { LOGGIN_ROUTES, SHARED_ROUTES } from '@app/configs/routes'

export function middleware(req: NextRequest) {
  const noRedirects = req.nextUrl.searchParams.get('noredirect')
  const staticResource = req.nextUrl.href.includes('static')
  const token = req.cookies.jwt

  if (
    !staticResource &&
    LOGGIN_ROUTES.includes(req.nextUrl.pathname) &&
    !token
  ) {
    // maybe simple redirect
    return new NextResponse(
      'Authentication Required. Please make sure cookies are enabled for authentication.'
    )
  }

  if (
    !staticResource &&
    !LOGGIN_ROUTES.includes(req.nextUrl.pathname) &&
    !SHARED_ROUTES.includes(req.nextUrl.pathname) &&
    token &&
    !noRedirects
  ) {
    return NextResponse.redirect('/dashboard')
  }

  NextResponse.next()
}

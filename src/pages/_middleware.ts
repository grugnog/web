import type { NextRequest, NextFetchEvent } from 'next/server'
import { NextResponse } from 'next/server'
import { LOGGIN_ROUTES, SHARED_ROUTES } from '@app/configs/routes'
import { getAPIRoute } from '@app/configs/api-route'

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const noRedirects = req.nextUrl.searchParams.get('noredirect')
  const staticResource = req.url.includes('/static/')
  const token = req.cookies.jwt

  if (!staticResource && req.page.name) {
    event.waitUntil(
      (async () => {
        const analyticsData = {
          page: req.page.name,
          userID: token || crypto.randomUUID!(),
          screenResolution: undefined,
          documentReferrer: req.referrer,
          ip: req.ip,
        }

        await fetch(`${getAPIRoute()}/log/page`, {
          method: 'POST',
          body: JSON.stringify(analyticsData),
          headers: {
            // @ts-ignore
            'user-agent': req?.ua?.ua,
          },
        }).catch((e) => {
          console.error(e)
        })
      })()
    )
  }

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

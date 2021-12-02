import type { NextRequest, NextFetchEvent } from 'next/server'
import { NextResponse } from 'next/server'
import { LOGGIN_ROUTES, SHARED_ROUTES } from '@app/configs/routes'
import { getAPIRoute } from '@app/configs/api-route'

const ID_COOKIE_NAME = 'uuid'

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const noRedirects = req.nextUrl.searchParams.get('noredirect')
  const staticResource = req.url.includes('/static/')
  const token = req.cookies.jwt
  let uuid = req.cookies[ID_COOKIE_NAME]

  if (!uuid) {
    uuid = crypto.randomUUID!()
  }

  if (!staticResource && req.page.name) {
    event.waitUntil(
      (async () => {
        const analyticsData = {
          page: req.page.name,
          userID: uuid,
          screenResolution: undefined,
          documentReferrer: req.referrer,
          ip: req.ip,
        }
        await fetch(`${getAPIRoute()}/log/page`, {
          method: 'POST',
          body: JSON.stringify(analyticsData),
          headers: {
            'user-agent': (req?.ua as NextRequest['ua'] & {
              ua: string
            })?.ua,
            'Content-Type': 'application/json',
            origin: req.nextUrl.origin || 'https://a11ywatch.com',
          },
        }).catch((e) => {
          console.error(e)
        })
      })()
    )
  }

  let res = NextResponse.next()

  // Authenticated middleware logic
  if (token) {
    if (
      !staticResource &&
      !LOGGIN_ROUTES.includes(req.nextUrl.pathname) &&
      !SHARED_ROUTES.includes(req.nextUrl.pathname) &&
      !req.nextUrl.pathname.includes('https://a11ywatch.com/src/') &&
      !noRedirects
    ) {
      res = NextResponse.redirect('/dashboard')
    }
  } else {
    if (!staticResource && LOGGIN_ROUTES.includes(req.nextUrl.pathname)) {
      res = NextResponse.redirect('/')
    }
  }

  if (!req.cookies[ID_COOKIE_NAME]) {
    res.cookie(ID_COOKIE_NAME, uuid)
  }

  return res
}
import type { NextRequest, NextFetchEvent } from 'next/server'
import { NextResponse } from 'next/server'
import { getRouteType } from '@app/configs/next/next-route'
import { logPage } from './api/_log-page'

const ID_COOKIE_NAME = 'uuid'
const JWT_COOKIE_NAME = 'jwt'
// coming from vercel
const VERCEL_PREFIX = `_vercel_`

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const { staticResource, pageRequest } = getRouteType(req)

  let res = NextResponse.next()

  // vercel build or static resource ignore middleware
  if (staticResource || req.cookies[`${VERCEL_PREFIX}${JWT_COOKIE_NAME}`]) {
    return res
  }

  let uuid = req.cookies[ID_COOKIE_NAME]

  const hostname = req.headers.get('host')
  const rootDomainHandle = `.${process.env.ROOT_URL}`
  const currentHost = hostname?.replace(rootDomainHandle, '')

  if (!uuid) {
    uuid = crypto.randomUUID!()
  }

  if (pageRequest) {
    event.waitUntil(
      (async () => {
        try {
          await logPage(req, uuid)
        } catch (e) {
          console.error(e)
        }
      })()
    )
  }

  if (
    currentHost === 'a11ywatch.blog' ||
    currentHost === 'www.a11ywatch.blog'
  ) {
    res = NextResponse.rewrite(`/blog${req.nextUrl.pathname}`)
  }

  if (!req.cookies[ID_COOKIE_NAME]) {
    res.cookie(ID_COOKIE_NAME, uuid, {
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
    })
  }

  return res
}

import type { NextRequest, NextFetchEvent } from 'next/server'
import { NextResponse } from 'next/server'
import { isWhitelisted } from '@app/configs/next/is-static-resource'
import { logPage } from '@app/lib/_log-page'

const ID_COOKIE_NAME = 'uuid'
const JWT_COOKIE_NAME = 'jwt'
// coming from vercel
const VERCEL_PREFIX = `_vercel_`

const ROOT_URL = `.${process.env.ROOT_URL}`

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const whiteListed = isWhitelisted(req)

  let res = NextResponse.next()

  // vercel build or static resource ignore middleware
  if (whiteListed || req.cookies[`${VERCEL_PREFIX}${JWT_COOKIE_NAME}`]) {
    return res
  }

  let uuid = req.cookies[ID_COOKIE_NAME]

  if (!uuid) {
    uuid = crypto.randomUUID!()
  }

  const currentHost = req.headers?.get('host')?.replace(ROOT_URL, '')

  if (
    currentHost === 'a11ywatch.blog' ||
    currentHost === 'www.a11ywatch.blog'
  ) {
    const url = req.nextUrl.clone()
    url.pathname = `/blog${req.nextUrl.pathname}`
    res = NextResponse.rewrite(url)
  }

  if (!req.cookies[ID_COOKIE_NAME]) {
    res.cookie(ID_COOKIE_NAME, uuid, {
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
    })
  }

  event.waitUntil(
    (async () => {
      try {
        await logPage(req, uuid)
      } catch (e) {
        console.error(e)
      }
    })()
  )

  return res
}

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
// import { LOGGIN_ROUTES, SHARED_ROUTES } from '@app/configs/routes'

const ID_COOKIE_NAME = 'uuid'

export async function middleware(req: NextRequest) {
  // const noRedirects = req.nextUrl.searchParams.get('noredirect')
  // const token = req.cookies.jwt
  let uuid = req.cookies[ID_COOKIE_NAME]

  if (!uuid) {
    uuid = crypto.randomUUID!()
  }

  const { pathname } = req.nextUrl
  const hostname = req.headers.get('host')

  const currentHost =
    process.env.NODE_ENV == 'production'
      ? hostname?.replace(`.${process.env.ROOT_URL}`, '')
      : process.env.CURR_HOST

  if (pathname.startsWith(`/_sites`)) {
    return new Response(null, { status: 404 })
  }

  if (currentHost === 'a11ywatch.blog') {
    if (
      !pathname.includes('.') && // exclude all files in the public folder
      !pathname.startsWith('/api') // exclude all API routes
    ) {
      console.log('blog page')
      // rewrite to the current hostname under the pages/sites folder
      // the main logic component will happen in pages/sites/[site]/index.tsx
      return NextResponse.rewrite(`/_sites/${currentHost}${pathname}`)
    }
  }

  let res = NextResponse.next()

  if (!req.cookies[ID_COOKIE_NAME]) {
    res.cookie(ID_COOKIE_NAME, uuid)
  }

  return res
}

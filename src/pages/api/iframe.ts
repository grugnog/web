import { iframe } from '@app/lib/iframe'
import type { NextApiRequest } from 'next'

export default async function handler(req: NextApiRequest) {
  let iframeSource
  let url
  let baseHref
  if (req.url) {
    try {
      const { searchParams } = new URL(req.url)
      url = searchParams.get('url')
      baseHref = searchParams.get('baseHref')
    } catch (e) {
      console.error(e)
    }
  }

  try {
    iframeSource = await iframe(url + ' ' || '', baseHref || '', req)
  } catch (e) {
    console.error(e)
  }

  return new Response(iframeSource, {
    status: 200,
    headers: {
      'content-type': 'text/html',
      // 'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
    },
  })
}

export const config = {
  runtime: 'experimental-edge',
}

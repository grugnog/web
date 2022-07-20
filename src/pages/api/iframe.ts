import { iframe } from '../../lib/iframe'

export const config = {
  runtime: 'experimental-edge',
}

export default async function handler(req: any) {
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

  const iframeSource = await iframe(url + ' ' || '', baseHref || '')

  return new Response(iframeSource, {
    status: 200,
    headers: {
      'content-type': 'text/html',
      // 'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
    },
  })
}

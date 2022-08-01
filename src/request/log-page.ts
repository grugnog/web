import { getAPIRoute } from '../configs/api-route'

const API_ROUTE = getAPIRoute('api', true)

// log page event for analytics
export const logPage = async (req: any, uuid: string, ua: any) => {
  const agent = req.headers.get('user-agent')
  const referer = req.headers.get('referer')
  const ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for')

  const headers = {
    'Content-Type': 'application/json',
    'User-Agent': agent ?? ua,
    Origin: req?.nextUrl?.origin || 'https://a11ywatch.com',
    Referer: referer ?? req.referer,
    ['X-Forwarded-For']: ip || req.ip,
    ['X-Forwarded-ID']: uuid,
    ['X-Forwarded-Path']: req?.nextUrl?.pathname,
  }

  await fetch(`${API_ROUTE}/log/page`, {
    method: 'POST',
    headers,
  })
}

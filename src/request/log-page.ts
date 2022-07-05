import { getAPIRoute } from '@app/configs/api-route'

// REMOVE SPECIFIC NEXT REQUEST PASSING FOR PROPS
export const logPage = async (req: any, uuid: string, ua: any) => {
  const API_ROUTE = getAPIRoute('api', true)
  const headers = {
    'Content-Type': 'application/json',
    'User-Agent': '',
    Origin: req?.nextUrl?.origin || 'https://a11ywatch.com',
    ['X-Forwarded-For']: req.ip,
  }

  if (ua) {
    headers['User-Agent'] = ua
  }

  const body = JSON.stringify({
    page: req?.nextUrl?.pathname,
    userID: uuid,
    screenResolution: undefined,
    documentReferrer: req.referrer,
    ip: req?.ip,
    _ga: req?.cookies.get('_ga'),
    geo: req.geo,
  })

  try {
    await fetch(`${API_ROUTE}/log/page`, {
      method: 'POST',
      body,
      headers,
    })
  } catch (e) {
    console.error(e)
  }
}

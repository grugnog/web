import { getAPIRoute } from '@app/configs/api-route'

// REMOVE SPECIFIC NEXT REQUEST PASSING FOR PROPS
export const logPage = async (req: any, uuid: string) => {
  const API_ROUTE = getAPIRoute('api', true)
  const headers = {
    'Content-Type': 'application/json',
    'User-Agent': '',
    Origin: req?.nextUrl?.origin || 'https://a11ywatch.com',
  }

  if (req?.ua?.ua) {
    headers['User-Agent'] = req.ua.ua
  }

  const body = JSON.stringify({
    page: req?.page?.name,
    userID: uuid,
    screenResolution: undefined,
    documentReferrer: req.referrer,
    ip: req?.ip,
    _ga: req?.cookies['_ga'],
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

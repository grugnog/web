import { IFRAME_ENDPOINT } from '@app/configs/next/iframe'

// fetch iframe reverse engineered website from API
export const iframe = async (
  url: string,
  baseHref: string | string[] | true,
  req: any
) => {
  const base = `/iframe?url=${encodeURIComponent(url)}&baseHref=${
    baseHref || true
  }`

  let data
  const authorization = req.cookies.get('authorization')

  try {
    const cookies = req?.cookies
    data = await fetch(IFRAME_ENDPOINT + base, {
      headers: {
        ...req.headers,
        Authorization: authorization,
        Cookie: cookies,
        ['x-forwarded-for']: req.ip,
        ['User-Agent']: req.headers['user-agent'],
      },
      // redirect: 'manual',
    })
  } catch (e) {
    console.error(e)
  }

  try {
    const iframe = data && (await data.text())

    return iframe
  } catch (e) {
    console.error(e)
    return ''
  }
}

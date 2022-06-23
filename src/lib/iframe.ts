import { IFRAME_ENDPOINT } from '@app/configs/next/iframe'

// fetch iframe reverse engineered website from API
export const iframe = async (
  url: string,
  baseHref: string | string[] | true
) => {
  const base = `/iframe?url=${encodeURIComponent(url)}&baseHref=${
    baseHref || true
  }`

  let data

  try {
    data = await fetch(IFRAME_ENDPOINT + base)
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

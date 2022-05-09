import { IFRAME_ENDPOINT } from '@app/configs/next/iframe'

let endpoint = IFRAME_ENDPOINT

// fetch iframe reverse engineered website from API
export const iframe = async (
  url: string,
  baseHref: string | string[] | true
) => {
  if (/^((http|https):\/\/)/.test(url) === false) {
    url = `http://${url}`
  }

  const base = `/iframe?url=${encodeURI(url)}&baseHref=${baseHref || true}`
  const path = `${endpoint}${base}`

  let data

  try {
    data = await fetch(path)
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

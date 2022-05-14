import { initUrl } from '@a11ywatch/website-source-builder'

// search the query [url, autoTPT]
export const searchQuery = (
  url: string,
  insecureTransport?: boolean
): [string, boolean] => {
  let squery = url
  let autoTPT = false

  if (/^(http|https)/.test(squery)) {
    autoTPT = true
  }

  const target = initUrl(url, insecureTransport)

  return [target, autoTPT]
}

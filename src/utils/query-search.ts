import { initUrl } from '@a11ywatch/website-source-builder'

// search the query [url, autoTPT]
export const searchQuery = (
  url: string,
  insecureTransport?: boolean
): [string, boolean] => {
  // raw html 
  if(!url) {
    return ["", false]
  }
  let autoTPT = false

  if (/^(http|https)/.test(url) === false) {
    autoTPT = true
  }

  const target = initUrl(url, insecureTransport)

  return [target, autoTPT]
}

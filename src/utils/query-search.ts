// search the query [url, autoTPT]
export const searchQuery = (
  url?: string,
  insecureTransport?: boolean
): [string, boolean] => {
  let tpt = ''
  let squery = String(url).replace(/\s/g, '')
  let autoTPT = false

  if (!/^(http|https)/.test(squery)) {
    tpt = `http${insecureTransport ? '' : 's'}://`
    autoTPT = true
  }

  return [`${tpt}${squery}`, autoTPT]
}

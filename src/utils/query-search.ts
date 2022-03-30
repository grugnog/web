export const searchQuery = (url?: string) => {
  let tpt = ''
  let squery = String(url).replace(/\s/g, '')

  if (!/^(http|https)/.test(squery)) {
    tpt = 'http://'
  }

  const hasExt = squery.split('.').pop()

  return `${tpt}${squery}${hasExt ? `` : '.com'}`
}

export const isUrl = (domain: string) => {
  if (domain) {
    let q = String(domain).replace(/\s/g, '')
    const hasExt = q?.includes('.')

    if (!/^(http|https)/.test(q)) {
      q = `http://${domain}${hasExt ? '' : '.com'}`
    }

    try {
      return new URL(q)
    } catch (e) {
      console.error(e)
    }
  }
}

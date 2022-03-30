export const isUrl = (domain: string) => {
  if (domain) {
    try {
      return new URL(domain)
    } catch (e) {
      console.error(e)
    }
  }
}

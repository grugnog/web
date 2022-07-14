// pass in a raw domain without http and strip subdomains for exact suffix
export const domainName = (domain: string) => {
  let base = domain.split('.')

  if (base.length >= 2) {
    base.pop() // remove the tld
  }
  return base[base.length - 1]
}

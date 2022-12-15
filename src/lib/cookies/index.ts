// fast exact parse params for cookies
const parseCookie = (ck: string, p1: string, p2: string): any => {
  const cookie = ck
    ? ck
    : typeof document !== 'undefined' &&
      typeof navigator !== 'undefined' &&
      navigator.cookieEnabled
    ? document.cookie
    : null

  const items: Record<string, any> = {
    [p1]: "",
    [p2]: "",
  }

  if (cookie) {
    const cookieSplit = cookie.split('; ')

    for (let i = 0; i < cookieSplit.length; i++) {
      const val = cookieSplit[i]
      if (
        (!items[p1] && val.startsWith(p1)) ||
        (!items[p2] && val.startsWith(p2))
      ) {
        const vals = val.split('=', 1)
        items[vals[0]] = vals[1]
      }
      if (items[p1] && items[p2]) {
        break
      }
    }
  }

  return items
}

export { parseCookie }

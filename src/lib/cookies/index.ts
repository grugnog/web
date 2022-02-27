const parseCookie = (ck: string): any => {
  const cookie = ck
    ? ck
    : typeof document !== 'undefined' &&
      typeof navigator !== 'undefined' &&
      navigator.cookieEnabled
    ? document.cookie
    : null

  if (cookie) {
    return cookie.split(';')?.reduce((res: any, c: any) => {
      const [key, val] = c.trim().split('=').map(decodeURIComponent)
      const allNumbers = (str: string) => /^\d+$/.test(str)
      try {
        return Object.assign(res, {
          [key]: allNumbers(val) ? val : JSON.parse(val),
        })
      } catch (_) {
        return Object.assign(res, { [key]: val })
      }
    }, {})
  }

  return { _a11yloggedin: false }
}

export { parseCookie }

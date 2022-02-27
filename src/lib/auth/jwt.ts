import atob from 'atob'

function parseJwt(token?: string): any {
  const defaultToken = { email: '', audience: null }

  if (!token) {
    return defaultToken
  }

  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')

    return JSON.parse(atob(base64))
  } catch (e) {
    console.error(e)
    return defaultToken
  }
}

export { parseJwt }

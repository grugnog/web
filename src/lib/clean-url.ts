const validTransport = (str: string) => {
  if (!str.indexOf('http://') || !str.indexOf('https://')) {
    return true
  }
  return false
}

const domainList: string[] = ['com', 'io']

interface Options {
  https?: boolean
  extension?: string
}

// clean any url that could be a website
export const cleanUrl = (websitUrl: string, options?: Options) => {
  const { https, extension } = options ?? {}
  let baseURl = websitUrl
  let tpt = https ? 'https' : 'http'

  // one char required
  if (!websitUrl) {
    return
  }

  if (!validTransport(websitUrl)) {
    baseURl = `${tpt}://${baseURl}`
  } else {
    baseURl = baseURl.replace(!https ? 'https' : 'http', tpt)
  }

  let blockExt = extension === 'none'

  if (baseURl.includes('localhost:')) {
    blockExt = true
  }

  // if the url has a extension simply ignore
  const ex =
    blockExt ||
    baseURl.includes('.') ||
    domainList.some((element: any) => baseURl.includes(element))
      ? ''
      : extension

  // TODO: use new URL
  return `${baseURl}${ex}`.trim()
}

import type { NextApiRequest, NextApiResponse } from 'next'

let HOST = String(
  process.env.IFRAME_URL || process.env.API || 'http://api:8080'
)

if (process.env.NODE_ENV !== 'production' && process.env.DOCKER_CONTAINER) {
  HOST.replace('localhost', 'api')
}

const iframe = async (req: NextApiRequest, res: NextApiResponse<string>) => {
  let url = String(req.query.url)

  if (/^((http|https):\/\/)/.test(url) === false) {
    url = `http://${url}`
  }

  const path = `${HOST}/iframe?url=${encodeURI(url)}&baseHref=${
    req.query.baseHref || true
  }`

  try {
    const data = await fetch(path)
    const iframe = await data.text()

    res.send(iframe)
  } catch (e) {
    console.error(e)
    res.send('')
  }
}

export default iframe

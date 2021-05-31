import type { NextApiRequest, NextApiResponse } from 'next'

const URL_ENDPOINT = String(process.env.IFRAME_URL ?? process.env.API ?? 'http://localhost:8010')

export default async (req: NextApiRequest, res: NextApiResponse<string>) => {
    let url = String(req.query.url)

    if (/^((http|https):\/\/)/.test(url) === false) {
      url = `http://${url}`
    }

    try {
      const data = await fetch(
        `${URL_ENDPOINT}/iframe?url=${encodeURI(url)}&baseHref=${
          req.query.baseHref || true
        }`
      )
      const iframe = await data.text()

      res.send(iframe)
    } catch (e) {
      console.error(e)
      res.send('')
    }
}
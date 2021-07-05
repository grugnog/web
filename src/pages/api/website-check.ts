import type { NextApiRequest, NextApiResponse } from 'next'

const HOST = String(process.env.API ?? 'http://localhost:8080')

const websiteCheck = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  let url = String(req.query.url)
  const token = req.headers.authorization

  if (/^((http|https):\/\/)/.test(url) === false) {
    url = `http://${url}`
  }

  try {
    const data = await fetch(
      `${HOST}/api/website-check?url=${encodeURI(url)}&baseHref=${
        req.query.baseHref || true
      }`,
      {
        method: 'POST',
        headers: new Headers({
          Authorization: 'Bearer' + token,
          'Content-Type': 'application/json',
        }),
      }
    )
    const source = await data.json()

    res.json(source)
  } catch (e) {
    console.error(e)
    res.json({ error: true, status: 404 })
  }
}

export default websiteCheck

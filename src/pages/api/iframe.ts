import { iframe } from '@app/lib/iframe'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let iframeSource
  const { url, baseHref } = req.query || req.body

  try {
    iframeSource = await iframe(url + ' ' || '', baseHref || '')
  } catch (e) {
    console.error(e)
  }

  res.status(200).send(iframeSource)
}

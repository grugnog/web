async function upstash({
  url,
  token,
  ...init
}: { url: string; token: string } & RequestInit) {
  const res = await fetch(url, {
    ...init,
    headers: {
      authorization: `Bearer ${token}`,
      ...init.headers,
    },
  })

  const data = res.headers.get('Content-Type')!.includes('application/json')
    ? await res.json()
    : await res.text()

  if (res.ok) {
    return data
  } else {
    throw new Error(
      `Upstash failed with (${res.status}): ${
        typeof data === 'string' ? data : JSON.stringify(data, null, 2)
      }`
    )
  }
}

export async function upstashRest(
  args: any[],
  options?: { pipeline: boolean }
) {
  const domain = process.env.UPSTASH_REST_API_DOMAIN
  const token = process.env.UPSTASH_REST_API_TOKEN || ''

  const url = `https://${domain}${options?.pipeline ? '/pipeline' : ''}`

  return upstash({
    token,
    url,
    method: 'POST',
    body: JSON.stringify(args),
  })
}

import { API_ENDPOINT } from '@app/configs'
import { UserManager } from '@app/managers'

// app fetch wrapper
export const fetcher = async (url: string, body?: Record<string, any>) => {
  let data = { data: null as any, message: '' }

  try {
    const source = await fetch(API_ENDPOINT + url, {
      headers: {
        authorization: UserManager.token,
        'Content-Type': 'application/json',
      },
      method: body ? 'POST' : 'GET',
      body: body ? JSON.stringify(body) : undefined,
    })
    const ds = await source.json()

    data = ds
  } catch (e) {
    console.error(e)
  }

  return data
}

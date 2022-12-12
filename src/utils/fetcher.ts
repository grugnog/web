import { API_ENDPOINT } from '@app/configs'
import { UserManager } from '@app/managers'

// app fetch wrapper todo: merge params
export const fetcher = async (
  url: string,
  body: Record<string, any> | null = null,
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' = 'GET'
) => {
  let data = { data: null as any, message: '', code: 200 }

  try {
    const headers = new Headers()

    if (UserManager.token) {
      headers.append('authorization', UserManager.token)
    }
    if ((method === 'POST' && body) || method !== 'POST') {
      headers.append('Content-Type', 'application/json')
    }

    const source = await fetch(API_ENDPOINT + url, {
      headers: headers,
      method: body ? 'POST' : method,
      body: body ? JSON.stringify(body) : null,
    })
    const ds = await source.json()

    data = ds
  } catch (e) {
    console.error(e)
  }

  return data
}

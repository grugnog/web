'use client'

import { AppManager, UserManager } from '@app/managers'
import { getAPIRoute } from '@app/configs'

const scanEndpoint = `${getAPIRoute('api')}/scan-simple`
const scanAuthedEndpoint = `${getAPIRoute('api')}/scan`

// SCOPE WEBSITE DATA PER ROUTE (ALL, ISSUES, PAGES)
export const scanWebsite = async (
  websiteUrl: string,
  authed?: boolean,
  html?: string,
  standard?: string
) => {
  let request

  try {
    request = await fetch(authed ? scanAuthedEndpoint : scanEndpoint, {
      method: 'POST',
      body: JSON.stringify({
        websiteUrl: websiteUrl ? encodeURIComponent(websiteUrl) : undefined,
        html: html ? html : undefined,
        standard,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: UserManager.token,
      },
    })
  } catch (e) {
    let message = 'Unknown Error'
    if (e instanceof Error) {
      message = e.message
    }
    return AppManager.toggleSnack(true, message, 'error')
  }

  // rate limit custom message on scan
  if (request && request.status === 429) {
    AppManager.toggleSnack(
      true,
      'Rate limited exceed, sign up and set a plan to increase limits.',
      'error',
      false,
      true
    )
    return Promise.resolve()
  }

  if (request && request?.ok) {
    try {
      return await request.json()
    } catch (e) {
      console.error(e)
      AppManager.toggleSnack(true, e, 'error')
    }
  }
}

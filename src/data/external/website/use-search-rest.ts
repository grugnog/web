import { useCallback, useState } from 'react'
import { isUrl } from '@app/lib/is-url'
import { AppManager, UserManager } from '@app/managers'
import { searchQuery } from '@app/utils'
import { getAPIRoute } from '@app/configs'
import type { Website } from '@app/types'

const scanEndpoint = `${getAPIRoute('api')}/scan-simple`
const scanAuthedEndpoint = `${getAPIRoute('api')}/scan`

// SCOPE WEBSITE DATA PER ROUTE (ALL, ISSUES, PAGES)
export const scanWebsite = async (
  websiteUrl: string,
  authed?: boolean,
  html?: string
) => {
  let request

  try {
    request = await fetch(authed ? scanAuthedEndpoint : scanEndpoint, {
      method: 'POST',
      body: JSON.stringify({
        websiteUrl: websiteUrl ? encodeURIComponent(websiteUrl) : undefined,
        html: html ? html : undefined,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: UserManager.token,
      },
    })
  } catch (e) {
    console.error(e)
    return AppManager.toggleSnack(true, e, 'error')
  }

  // rate limit custom message on scan
  if (request && request.status === 429) {
    AppManager.toggleSnack(
      true,
      'Rate limited exceed, sign up and set a plan to increase limits.',
      'error'
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

interface Scan {
  data?: { data?: Website } // TODO: reduce dup data
  loading: boolean
}

// TODO: USE OpenAPI CALL
export function useSearchRest() {
  const [search, setQuery] = useState<string>('')
  const [html, setHtml] = useState<string>('')

  const [state, setScan] = useState<Scan>({
    loading: false,
    data: undefined,
  })

  const { data: scanState, loading } = state ?? {}

  const setSearch = (event: any) => setQuery(event?.target?.value)

  const scanPage = useCallback(
    async (query?: string, markup?: boolean) => {
      const q = query || search

      setScan({ loading: true })
     
      const [querySearch, autoTPT] = markup ? ["", false] : searchQuery(q)

      let snackOpen = false

      if (!markup) {
        if (autoTPT) {
          AppManager.toggleSnack(true, 'https:// automatically added to query.')
          snackOpen = true
        }

      }

      // todo: opt in authed scan besides url target
      const authed =
        window.location.pathname === '/dashboard' && !!UserManager.token

      // if html bool found run body
      let response = await scanWebsite(
        querySearch,
        authed,
        markup ? query : undefined // direct markup
      )

      if (response && [300, 400].includes(response?.code)) {
        AppManager.toggleSnack(true, response.message)
      }

      // Retry query as http if https autofilled [TODO: move autoquery detection to SS ]
      if (!response?.data && !markup && autoTPT && response?.code !== 300) {
        AppManager.toggleSnack(
          true,
          'https:// failed retrying with http:// ...'
        )
        const [target] = searchQuery(q, true)
        response = await scanWebsite(target, authed)
        snackOpen = true
      }

      setScan({
        loading: false,
        data: response,
      })

      if (snackOpen) {
        setTimeout(() => {
          AppManager.closeSnack()
        }, 6000)
      }
    },
    [setScan, search]
  )

  const closeModal = () => {
    setScan({ loading: false, data: undefined })
  }

  // move validation
  const toggleModal = async (target: string, markup?: boolean) => {
    // TODO: revisit url checking
    if (!markup && !isUrl(target)?.origin) {
      return AppManager.toggleSnack(
        true,
        'Please enter a valid website url starting with http:// or https://',
        'error'
      )
    }

    return await scanPage(target, markup)
  }

  return {
    search,
    html,
    setSearch,
    scanPage,
    setHtml,
    loading,
    data: scanState && scanState.data,
    closeModal,
    toggleModal,
  }
}

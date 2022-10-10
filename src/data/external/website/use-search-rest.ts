import { useState } from 'react'
import { isUrl } from '@app/lib/is-url'
import { AppManager } from '@app/managers'
import { searchQuery } from '@app/utils'
import { getAPIRoute } from '@app/configs'
import { Website } from '@app/types'

const scanEndpoint = `${getAPIRoute('api')}/scan-simple`

// SCOPE WEBSITE DATA PER ROUTE (ALL, ISSUES, PAGES)
export const scanWebsite = async (websiteUrl: string) => {
  let request
  try {
    request = await fetch(scanEndpoint, {
      method: 'POST',
      body: JSON.stringify({
        websiteUrl: encodeURIComponent(websiteUrl),
      }),
      headers: {
        'Content-Type': 'application/json',
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
  const [state, setScan] = useState<Scan>({
    loading: false,
    data: undefined,
  })

  const { data: scanState, loading } = state ?? {}

  const setSearch = (event: any) => {
    setQuery(event?.target?.value)
  }

  const scanPage = async () => {
    setScan({ loading: true })

    const [querySearch, autoTPT] = searchQuery(search)

    if (autoTPT) {
      AppManager.toggleSnack(true, 'https:// automatically added to query.')
    }

    let response = await scanWebsite(querySearch)

    if (response && response?.code === 400) {
      AppManager.toggleSnack(true, response.message)
    }

    // Retry query as http if https autofilled [TODO: move autoquery detection to SS ]
    if (!response?.data && autoTPT) {
      AppManager.toggleSnack(true, 'https:// failed retrying with http:// ...')
      const [q] = searchQuery(search, true)
      response = await scanWebsite(q)
    }

    setScan({
      loading: false,
      data: response,
    })
  }

  const closeModal = () => {
    setScan({ loading: false, data: undefined })
  }

  // move validation
  const toggleModal = async (url: string) => {
    // TODO: revisit url checking
    if (!isUrl(url)?.origin) {
      return AppManager.toggleSnack(
        true,
        'Please enter a valid website url starting with http:// or https://',
        'error'
      )
    }

    try {
      await scanPage()
    } catch (e) {
      console.error(e)
    }
  }

  return {
    search,
    setSearch,
    scanPage,
    loading,
    data: scanState && scanState.data,
    closeModal,
    toggleModal,
  }
}

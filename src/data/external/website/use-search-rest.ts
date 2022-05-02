import { useCallback, useState } from 'react'
import { isUrl } from '@app/lib/is-url'
import { AppManager } from '@app/managers'
import { searchQuery } from '@app/utils'
import { getAPIRoute } from '@app/configs'
import { Website } from '@app/types'

// SCOPE WEBSITE DATA PER ROUTE (ALL, ISSUES, PAGES)
export const scanWebsite = async (websiteUrl: string) => {
  try {
    const request = await fetch(`${getAPIRoute('api')}/scan-simple`, {
      method: 'POST',
      body: JSON.stringify({
        websiteUrl,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // rate limit custom message on scan
    if (request.status === 429) {
      AppManager.toggleSnack(
        true,
        'Rate limited exceed, sign up and set a plan to increase limits.',
        'error'
      )
      return Promise.resolve()
    }

    if (request?.ok) {
      return await request.json()
    }
  } catch (e) {
    console.error(e)
    AppManager.toggleSnack(true, e, 'error')
  }
}

interface Scan {
  data?: { website?: Website }
  loading: boolean
}

// TODO: USE REST CALL
export function useSearchRest() {
  const [search, setQuery] = useState<string>('')
  const [{ data, loading }, setScan] = useState<Scan>({
    loading: false,
    data: undefined,
  })
  // modal state
  const { website } = data ?? {}

  const setSearch = useCallback(
    (event: any) => {
      setQuery(event?.target?.value)
    },
    [setQuery]
  )

  const scanPage = async () => {
    try {
      const [querySearch, autoTPT] = searchQuery(search)

      if (autoTPT) {
        AppManager.toggleSnack(true, 'https:// automatically added to query.')
      }
      setScan({ loading: true })
      let json = await scanWebsite(querySearch)

      // retry query as http if https autofilled [TODO: move autoquery detection to SS ]
      if (json && !json?.data && autoTPT) {
        AppManager.toggleSnack(
          true,
          'https:// failed retrying with http:// ...'
        )

        const [q] = searchQuery(search, true)
        json = await scanWebsite(q)
      }

      setScan({ loading: false, data: json })

      return json
    } catch (e) {
      console.error(e)
    }
  }

  const closeModal = () => {
    setScan({ loading: false, data: undefined })
  }

  // move validation
  const toggleModal = async (url: string) => {
    const origin = isUrl(url)?.origin

    if (!origin) {
      AppManager.toggleSnack(
        true,
        'Please enter a valid website url starting with http:// or https://',
        'error'
      )
      return
    }

    await scanPage()
  }

  return {
    search,
    setSearch,
    scanPage,
    loading,
    data: website,
    closeModal,
    toggleModal,
  }
}

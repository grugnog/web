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
    const querySearch = searchQuery(search)
    setScan({ loading: true })
    const json = await scanWebsite(querySearch)
    setScan({ loading: false, data: json })

    return json
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

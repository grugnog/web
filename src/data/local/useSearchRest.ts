import { SyntheticEvent, useCallback, useState } from 'react'
import { isUrl } from '@app/lib/is-url'
import { AppManager } from '@app/managers'
import { searchQuery } from '@app/utils'
import { getAPIRoute } from '@app/configs'
import { Website } from '@app/types'

const defaultState = {
  bottomModal: false,
  website: null,
}

// SCOPE WEBSITE DATA PER ROUTE (ALL, ISSUES, PAGES)
export const scanWebsite = async (url: string) => {
  try {
    const request = await fetch(`${getAPIRoute('api')}/scan-simple`, {
      method: 'POST',
      body: JSON.stringify({
        url,
      }),
      headers: {
        contentType: 'application/json',
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
  const [{ data: crawlData, loading }, setScan] = useState<Scan>({
    loading: false,
    data: undefined,
  })

  const [data, setSearchState] = useState<typeof defaultState>(defaultState)

  const { bottomModal, website } = data || defaultState

  const setSearch = useCallback(
    (event: any) => {
      setQuery(event?.search)
    },
    [setQuery]
  )

  const scanPage = async (
    event: null | SyntheticEvent<HTMLInputElement>,
    text: string
  ) => {
    event?.preventDefault()
    const querySearch = searchQuery(text || search)
    setScan({ loading: true })
    const json = await scanWebsite(querySearch)
    setScan({ loading: false, data: json })

    return json
  }

  const closeFeed = () => {
    setSearchState(defaultState)
  }

  // move validation
  const toggleModal = async (bottom: boolean, url: string) => {
    const origin = isUrl(url)?.origin

    if (!origin) {
      AppManager.toggleSnack(
        true,
        'Please enter a valid website url starting with http:// or https://',
        'error'
      )
      return
    }

    if (bottom && origin) {
      const web = await scanPage(null, origin)
      if (web) {
        setSearchState({
          bottomModal: bottom,
          website: web,
        })
      } else {
        setSearchState(defaultState)
      }
    }
  }

  return {
    search,
    setSearch,
    scanPage,
    loading,
    website: crawlData?.website ||
      website || {
        url: search,
      },
    crawlData,
    closeFeed,
    bottomModal,
    toggleModal,
  }
}

import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { SCAN_WEBSITE } from '@app/mutations'
import { AppManager } from '@app/managers'
import { searchQuery } from '@app/utils'
import { useMemo } from 'react'

const GET_SEARCH_STATE = gql`
  query getCtaSearchState {
    ctaSearch @client {
      search
      bottomModal
      website
    }
  }
`

const defaultState = {
  search: '',
  bottomModal: false,
  website: null,
}

export function useSearch() {
  const { data, client } = useQuery(GET_SEARCH_STATE, { ssr: false })
  const [scanWebsite, { data: crawlData, loading }] = useMutation(SCAN_WEBSITE)
  const { search, bottomModal, website } = data?.ctaSearch || defaultState

  const webData = useMemo(() => {
    if (crawlData?.scanWebsite?.website) {
      return crawlData.scanWebsite.website
    }
    if (website) {
      return JSON.parse(website)
    }
    return {
      url: search,
    }
  }, [crawlData, website, search])

  const setSearch = (event: { search?: string }) => {
    client.writeData({
      data: {
        ctaSearch: {
          search: event?.search || '',
          bottomModal: false,
          website: null,
          __typename: 'SearchWebsites',
        },
      },
    })
  }

  const scanPage = async (event: any, text: string) => {
    event?.preventDefault()
    const q = text || search

    const [querySearch, autoTPT] = searchQuery(q)

    if (autoTPT) {
      AppManager.toggleSnack(true, 'https:// automatically added to query.')
    }

    let results = null

    try {
      results = await scanWebsite({
        variables: {
          url: querySearch,
        },
      })
    } catch (e) {
      console.error(e)
    }

    // Retry query as http if https autofilled [TODO: move autoquery detection to SS ]
    if (!results && autoTPT) {
      AppManager.toggleSnack(true, 'https:// failed retrying with http:// ...')
      const [qf] = searchQuery(search, true)
      try {
        results = await scanWebsite({
          variables: {
            url: qf,
          },
        })
      } catch (e) {
        console.error(e)
      }
    }

    let data = results?.data

    if (!data?.scanWebsite?.success || !data) {
      AppManager.toggleSnack(true, data?.scanWebsite?.message, 'error')
      return closeFeed()
    }

    const page = data?.scanWebsite?.website

    client.writeData({
      data: {
        ctaSearch: {
          search: q,
          bottomModal: true,
          website: JSON.stringify(page),
          __typename: 'SearchWebsites',
        },
      },
    })
  }

  const closeFeed = () => {
    client.writeData({
      data: {
        ctaSearch: {
          search: search,
          bottomModal: false,
          website: null,
          __typename: 'SearchWebsites',
        },
      },
    })
    if (crawlData && crawlData.scanWebsite) {
      crawlData.scanWebsite.website = null
    }
  }

  // replace name to search
  const toggleModal = async (bottom: boolean, url: string) => {
    if (!url) {
      AppManager.toggleSnack(
        true,
        'Please enter a valid website url starting with http:// or https://',
        'error'
      )
      return
    }

    client.writeData({
      data: {
        ctaSearch: {
          search: !bottom ? '' : search,
          bottomModal: bottom,
          website: null,
          __typename: 'SearchWebsites',
        },
      },
    })

    try {
      await scanPage(null, url)
    } catch (e) {
      console.error(data)
    }
  }

  return {
    search,
    setSearch,
    scanPage,
    loading,
    website: webData,
    crawlData,
    closeFeed,
    bottomModal,
    toggleModal,
  }
}

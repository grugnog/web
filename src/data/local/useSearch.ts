import { useEffect } from 'react'
import { useApolloClient, useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { isUrl } from '@app/lib/is-url'
import { logGraphErrors } from '@app/lib/log'
import { SCAN_WEBSITE } from '@app/mutations'
import { AppManager } from '@app/managers'
import { searchQuery } from '@app/utils'

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
  const client = useApolloClient()
  const [scanWebsite, { data: crawlData, loading }] = useMutation(SCAN_WEBSITE)
  const { data } = useQuery(GET_SEARCH_STATE)
  const { search, bottomModal, website } = data?.ctaSearch || defaultState

  const setSearch = (event: any) => {
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

    const [querySearch] = searchQuery(text || search)

    await scanWebsite({
      variables: {
        url: querySearch,
      },
    }).catch(logGraphErrors)
  }

  const closeFeed = () => {
    client.writeData({
      data: {
        ctaSearch: {
          search: '',
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
  const toggleModal = (bottom: boolean, url: string) => {
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
      scanPage(null, origin)
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
  }

  useEffect(() => {
    if (crawlData?.scanWebsite) {
      if (!crawlData?.scanWebsite?.success) {
        AppManager.toggleSnack(true, crawlData?.scanWebsite?.message, 'error')
        closeFeed()
      } else {
        const page = crawlData?.scanWebsite?.website
        client.writeData({
          data: {
            ctaSearch: {
              search,
              bottomModal,
              website: JSON.stringify(page),
              __typename: 'SearchWebsites',
            },
          },
        })
      }
    }
  }, [crawlData])

  return {
    search,
    setSearch,
    scanPage,
    loading,
    website: crawlData?.scanWebsite?.website ||
      (website && JSON.parse(website)) || {
        url: search,
      },
    crawlData,
    closeFeed,
    bottomModal,
    toggleModal,
  }
}

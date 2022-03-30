import { SyntheticEvent, useEffect } from 'react'
import { useApolloClient, useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { isUrl } from '@app/lib/is-url'
import { logGraphErrors } from '@app/lib/log'
import { SCAN_WEBSITE } from '@app/mutations'
import { AppManager } from '@app/managers'

const GET_SEARCH_STATE = gql`
  query getCtaSearchState {
    ctaSearch @client {
      search
      hideWebsite
      bottomModal
      website
    }
  }
`

const defaultState = {
  search: '',
  hideWebsite: false,
  bottomModal: false,
  website: null,
}

// TODO: MOVE TO REST CALL
export function useSearchRest() {
  const client = useApolloClient()
  const [scanWebsite, { data: crawlData, loading }] = useMutation(SCAN_WEBSITE)

  const { data } = useQuery(GET_SEARCH_STATE)

  const { search, hideWebsite, bottomModal, website } =
    data?.ctaSearch || defaultState

  const setSearch = (event: any) => {
    client.writeData({
      data: {
        ctaSearch: {
          search: event?.search || '',
          hideWebsite: false,
          bottomModal: false,
          website: null,
          __typename: 'SearchWebsites',
        },
      },
    })
  }

  const scanPage = async (
    event: null | SyntheticEvent<HTMLInputElement>,
    text: string
  ) => {
    event?.preventDefault()

    let tpt = ''
    let squery = String(text || search)

    if (!squery.includes('http')) {
      tpt = 'http://'
    }

    const hasExt = squery.split('.').pop()

    const querySearch = `${tpt}${squery}${hasExt ? `` : '.com'}`

    scanWebsite({
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
          hideWebsite: true,
          bottomModal: false,
          website: null,
          __typename: 'SearchWebsites',
        },
      },
    })
    if (crawlData.scanWebsite) {
      crawlData.scanWebsite.website = null
    }
  }

  // move validation
  const toggleModal = (bottom: boolean, text: string) => {
    const txt = text || ''
    const hasPriorCom = txt?.includes('.')

    if (!isUrl(txt) && !hasPriorCom) {
      AppManager.toggleSnack(
        true,
        'Please enter a valid website url starting with http:// or https://',
        'error'
      )
    } else {
      if (bottom && txt) {
        scanPage(null, txt)
      }
      client.writeData({
        data: {
          ctaSearch: {
            hideWebsite: true,
            search: !bottom ? '' : search,
            bottomModal: bottom,
            website: null,
            __typename: 'SearchWebsites',
          },
        },
      })
    }
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
              hideWebsite,
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
    hideWebsite,
    crawlData,
    closeFeed,
    bottomModal,
    toggleModal,
  }
}

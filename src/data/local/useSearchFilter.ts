import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useMemo } from 'react'

const GET_SEARCH_FILTER_STATE = gql`
  query getSearchFilterState {
    searchFilter @client {
      search
    }
  }
`

// use apollo cache for global search state
export function useSearchFilter() {
  const { data, client } = useQuery(GET_SEARCH_FILTER_STATE, { ssr: false })

  const setSearchFilter = (event: any) => {
    client.writeData({
      data: {
        searchFilter: {
          search: event?.target?.value,
          __typename: 'SearchFilter',
        },
      },
    })
  }

  const search = useMemo(() => {
    if (data?.searchFilter?.search) {
      return data.searchFilter.search.toLowerCase()
    }
    return ''
  }, [data])

  return {
    search,
    setSearchFilter,
  }
}

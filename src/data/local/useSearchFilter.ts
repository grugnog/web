import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_SEARCH_FILTER_STATE = gql`
  query getSearchFilterState {
    searchFilter @client {
      search
    }
  }
`

// use apollo cache for global search state
export function useSearchFilter() {
  const { data, client } = useQuery(GET_SEARCH_FILTER_STATE, {
    fetchPolicy: 'cache-only',
    ssr: false,
  })
  const search = data?.searchFilter?.search || ''

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

  return {
    search: search.toLowerCase(),
    setSearchFilter,
  }
}

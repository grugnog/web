import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_SEARCH_FILTER_STATE = gql`
  query getSearchFilterState {
    searchFilter @client {
      search
    }
  }
`

// remove for context usage - preventing requries
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

  return {
    search: data?.searchFilter?.search || '',
    setSearchFilter,
  }
}

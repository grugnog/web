import gql from 'graphql-tag'

export const SORT_WEBSITES = gql`
  mutation SortWebsites($order: [String]) {
    sortWebsites(order: $order) {
      code
      success
      message
    }
  }
`

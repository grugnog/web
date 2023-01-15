import gql from 'graphql-tag'

const GET_ANALYTICS = gql`
  query getAnalytics($filter: String) {
    user {
      id
      analytics(filter: $filter) {
        pageUrl
        domain
        warningCount
        noticeCount
        errorCount
        accessScore
      }
    }
  }
`

export { GET_ANALYTICS }

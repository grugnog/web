import gql from 'graphql-tag'

const GET_ISSUE = gql`
  query getIssue($url: String) {
    issue(url: $url) {
      pageUrl
      issues {
        code
        type
        selector
        message
        context
        recurrence
      }
    }
  }
`

export { GET_ISSUE }

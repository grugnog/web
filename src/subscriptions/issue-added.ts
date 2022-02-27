import gql from 'graphql-tag'

export const ISSUE_SUBSCRIPTION = gql`
  subscription issueAdded($userId: Int) {
    issueAdded(userId: $userId) {
      domain
      pageUrl
      issues {
        code
        type
        selector
        message
        context
      }
    }
  }
`

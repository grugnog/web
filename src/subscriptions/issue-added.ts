import gql from 'graphql-tag'

export const ISSUE_SUBSCRIPTION = gql`
  subscription issueAdded {
    issueAdded {
      domain
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

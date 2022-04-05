import gql from 'graphql-tag'

export const SUBDOMAIN_SUBSCRIPTION = gql`
  subscription subDomainAdded($userId: Int) {
    subDomainAdded(userId: $userId) {
      url
      domain
      adaScore
      cdnConnected
      pageInsights
      insight {
        json
      }
      pageLoadTime {
        duration
        durationFormated
        color
      }
      issuesInfo {
        issuesFixedByCdn
        possibleIssuesFixedByCdn
        totalIssues
      }
      issues {
        code
        type
        selector
        message
        context
        pageUrl
      }
    }
  }
`

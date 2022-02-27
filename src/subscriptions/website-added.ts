import gql from 'graphql-tag'

export const WEBSITE_SUBSCRIPTION = gql`
  subscription websiteAdded($userId: Int) {
    websiteAdded(userId: $userId) {
      domain
      adaScore
      cdnConnected
      html
      htmlIncluded
      lastScanDate
      online
      script {
        script
        cdnUrl
        cdnUrlMinified
      }
      pageLoadTime {
        duration
        durationFormated
        color
      }
      pageHeaders {
        key
        value
      }
      issuesInfo {
        issuesFixedByCdn
        possibleIssuesFixedByCdn
        totalIssues
      }
    }
  }
`

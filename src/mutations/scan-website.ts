import gql from 'graphql-tag'

const SCAN_WEBSITE = gql`
  mutation ScanWebsite($url: String) {
    scanWebsite(url: $url) {
      code
      success
      message
      website {
        _id
        url
        domain
        cdnConnected
        cdn
        userId
        lastScanDate
        timestamp
        online
        mobile
        script {
          script
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
          adaScore
          issuesFixedByCdn
          possibleIssuesFixedByCdn
          totalIssues
          errorCount
          warningCount
          limitedCount
        }
        script {
          script
        }
        issue {
          code
          type
          message
          context
          selector
          runner
        }
      }
    }
  }
`

export { SCAN_WEBSITE }

import gql from 'graphql-tag'

export const CRAWL_WEBSITE = gql`
  mutation CrawlWebsite($url: String) {
    crawlWebsite(url: $url) {
      code
      success
      message
      website {
        url
        domain
        adaScore
        cdnConnected
        lastScanDate
        userId
        online
        adaScoreAverage
        insight {
          json
        }
        script {
          script
          cdnUrl
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
      }
    }
  }
`

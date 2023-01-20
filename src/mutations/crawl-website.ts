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
        cdnConnected
        lastScanDate
        userId
        online
        mobile
        insight {
          json
        }
        pageLoadTime {
          duration
          durationFormated
        }
        issuesInfo {
          accessScore
          issuesFixedByCdn
          possibleIssuesFixedByCdn
          totalIssues
          cdnConnected
          errorCount
          warningCount
          noticeCount
          pageCount
        }
      }
    }
  }
`

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
        script {
          _id
          script
          cdnUrl
        }
        pageLoadTime {
          duration
          durationFormated
          color
        }
        issuesInfo {
          adaScore
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

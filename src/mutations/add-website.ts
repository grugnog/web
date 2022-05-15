import gql from 'graphql-tag'

export const ADD_WEBSITE = gql`
  mutation AddWebsite(
    $url: String!
    $customHeaders: [CreatePageHeaders]
    $pageInsights: Boolean
    $mobile: Boolean
    $standard: String
    $ua: String
  ) {
    addWebsite(
      url: $url
      customHeaders: $customHeaders
      pageInsights: $pageInsights
      mobile: $mobile
      standard: $standard
      ua: $ua
    ) {
      website {
        url
        id
        userId
        domain
        adaScore
        adaScoreAverage
        cdnConnected
        lastScanDate
        online
        pageInsights
        mobile
        standard
        ua
        insight {
          json
        }
        script {
          id
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
          adaScoreAverage
          issuesFixedByCdn
          possibleIssuesFixedByCdn
          totalIssues
          cdnConnected
          skipContentIncluded
          errorCount
          warningCount
          noticeCount
          limitedCount
        }
        issues {
          pageUrl
          issues {
            code
            type
            selector
            message
            context
          }
        }
        subDomains {
          domain
          url
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
          issues {
            code
            type
            selector
            message
            context
          }
        }
      }
      code
      success
      message
    }
  }
`

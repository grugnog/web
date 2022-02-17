import gql from 'graphql-tag'

export const ADD_WEBSITE = gql`
  mutation AddWebsite(
    $url: String!
    $customHeaders: [CreatePageHeaders]
    $pageInsights: Boolean
  ) {
    addWebsite(
      url: $url
      customHeaders: $customHeaders
      pageInsights: $pageInsights
    ) {
      website {
        url
        id
        userId
        domain
        adaScore
        cdnConnected
        html
        htmlIncluded
        lastScanDate
        online
        pageInsights
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
          issuesFixedByCdn
          possibleIssuesFixedByCdn
          totalIssues
          cdnConnected
          skipContentIncluded
          errorCount
          warningCount
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
          html
          htmlIncluded
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
            pageUrl
          }
        }
      }
      code
      success
      message
    }
  }
`

import gql from 'graphql-tag'

export const ADD_WEBSITE = gql`
  mutation AddWebsite($url: String!, $customHeaders: [CreatePageHeaders]) {
    addWebsite(url: $url, customHeaders: $customHeaders) {
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
            pageUrl
          }
        }
        subDomains {
          domain
          url
          adaScore
          cdnConnected
          html
          htmlIncluded
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

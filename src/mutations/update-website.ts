import gql from 'graphql-tag'

export const UPDATE_WEBSITE = gql`
  mutation UpdateWebsite(
    $url: String
    $customHeaders: [CreatePageHeaders]
    $pageInsights: Boolean
    $mobile: Boolean
    $standard: String
    $ua: String
    $actions: [PageActionsInput]
    $tld: Boolean
    $subdomains: Boolean
  ) {
    updateWebsite(
      url: $url
      customHeaders: $customHeaders
      pageInsights: $pageInsights
      mobile: $mobile
      standard: $standard
      ua: $ua
      actions: $actions
      tld: $tld
      subdomains: $subdomains
    ) {
      code
      success
      message
      website {
        url
        _id
        domain
        userId
        mobile
        tld
        subdomains
        script {
          _id
          script
        }
        standard
        pageInsights
        insight {
          json
        }
        pageHeaders {
          key
          value
        }
        actions {
          _id
          path
          events
        }
        pages {
          domain
          url
          pageInsights
          insight {
            json
          }
          issues {
            code
            type
            selector
            message
            context
            recurrence
          }
        }
        issues {
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
    }
  }
`

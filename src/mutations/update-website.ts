import gql from 'graphql-tag'

export const UPDATE_WEBSITE = gql`
  mutation UpdateWebsite(
    $url: String
    $customHeaders: [CreatePageHeaders]
    $pageInsights: Boolean
    $mobile: Boolean
  ) {
    updateWebsite(
      url: $url
      customHeaders: $customHeaders
      pageInsights: $pageInsights
      mobile: $mobile
    ) {
      code
      success
      message
      website {
        url
        id
        domain
        userId
        mobile
        script {
          script
        }
        pageInsights
        insight {
          json
        }
        pageHeaders {
          key
          value
        }
        subDomains {
          domain
          url
          pageInsights
          insight {
            json
          }
          issues {
            url
            code
            type
            selector
            message
            context
            pageUrl
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
          }
        }
      }
    }
  }
`

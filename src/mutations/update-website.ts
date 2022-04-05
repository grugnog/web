import gql from 'graphql-tag'

export const UPDATE_WEBSITE = gql`
  mutation UpdateWebsite(
    $url: String
    $customHeaders: [CreatePageHeaders]
    $pageInsights: Boolean
  ) {
    updateWebsite(
      url: $url
      customHeaders: $customHeaders
      pageInsights: $pageInsights
    ) {
      code
      success
      message
      website {
        url
        id
        domain
        userId
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

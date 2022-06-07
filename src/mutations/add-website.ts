import { websiteFragments } from '@app/apollo'
import gql from 'graphql-tag'

export const ADD_WEBSITE = gql`
  ${websiteFragments}
  mutation AddWebsite(
    $url: String!
    $customHeaders: [CreatePageHeaders]
    $pageInsights: Boolean
    $mobile: Boolean
    $standard: String
    $ua: String
    $actions: [PageActionsInput]
  ) {
    addWebsite(
      url: $url
      customHeaders: $customHeaders
      pageInsights: $pageInsights
      mobile: $mobile
      standard: $standard
      ua: $ua
      actions: $actions
    ) {
      website {
        ...WebsiteParts
      }
      code
      success
      message
    }
  }
`

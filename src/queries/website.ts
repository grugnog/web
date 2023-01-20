import { websiteFragments, pagespeedFragment } from '@app/apollo'
import gql from 'graphql-tag'

const GET_WEBSITE = gql`
  ${websiteFragments}
  query getWebsite($url: String) {
    website(url: $url) {
      ...WebsiteParts
      pageLoadTime {
        duration
        durationFormated
        color
      }
      issues {
        pageUrl
      }
    }
  }
`

const GET_WEBSITE_STATS = gql`
  ${websiteFragments}
  query getWebsite($url: String) {
    website(url: $url) {
      ...WebsiteParts
    }
  }
`

const GET_PAGESPEED_STATS = gql`
  ${pagespeedFragment}
  query getPagespeed($url: String) {
    pagespeed(url: $url) {
      ...PagespeedParts
    }
  }
`

export { GET_WEBSITE, GET_WEBSITE_STATS, GET_PAGESPEED_STATS }

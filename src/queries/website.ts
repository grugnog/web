import { websiteFragments } from '@app/apollo'
import gql from 'graphql-tag'

const GET_WEBSITE = gql`
  ${websiteFragments}
  query getWebsite($url: String) {
    website(url: $url) {
      ...WebsiteParts
      script {
        _id
        script
        cdnUrl
        cdnUrlMinified
      }
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

export { GET_WEBSITE, GET_WEBSITE_STATS }

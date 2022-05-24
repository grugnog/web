import { websiteFragments } from '@app/apollo'
import gql from 'graphql-tag'

export const REMOVE_WEBSITE = gql`
  ${websiteFragments}
  mutation RemoveWebsite($url: String, $deleteMany: Boolean) {
    removeWebsite(url: $url, deleteMany: $deleteMany) {
      code
      success
      message
      website {
        ...WebsiteParts
      }
    }
  }
`

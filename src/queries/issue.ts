import { issueFragments } from '@app/apollo'
import gql from 'graphql-tag'

const GET_ISSUE = gql`
  ${issueFragments}
  query getIssue($url: String) {
    issue(url: $url) {
      ...IssueParts
    }
  }
`

export { GET_ISSUE }

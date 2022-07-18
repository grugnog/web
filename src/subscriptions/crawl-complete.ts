import gql from 'graphql-tag'

const CRAWL_COMPLETE_SUBSCRIPTION = gql`
  subscription crawlComplete($userId: Int) {
    crawlComplete(userId: $userId) {
      domain
      adaScoreAverage
      shutdown
    }
  }
`

export { CRAWL_COMPLETE_SUBSCRIPTION }

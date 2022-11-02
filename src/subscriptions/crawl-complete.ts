import gql from 'graphql-tag'

const CRAWL_COMPLETE_SUBSCRIPTION = gql`
  subscription crawlComplete {
    crawlComplete {
      domain
      adaScoreAverage
      shutdown
    }
  }
`

export { CRAWL_COMPLETE_SUBSCRIPTION }

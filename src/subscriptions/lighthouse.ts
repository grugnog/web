import gql from 'graphql-tag'

const LIGHTHOUSE_RESULT = gql`
  subscription lighthouseResult {
    lighthouseResult {
      domain
      url
      userId
      insight {
        json
      }
    }
  }
`

export { LIGHTHOUSE_RESULT }

import gql from 'graphql-tag'

const GET_FEATURES = gql`
  query getFeatures {
    features {
      id
      feature
      enabled
    }
  }
`

export { GET_FEATURES }

import gql from 'graphql-tag'

const GET_HISTORY = gql`
  query getHistory {
    user {
      id
      history {
        _id
        url
        domain
      }
    }
  }
`

export { GET_HISTORY }

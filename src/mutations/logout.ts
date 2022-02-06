import gql from 'graphql-tag'

export const LOGOUT = gql`
  mutation Logout {
    logout {
      code
      success
      message
    }
  }
`

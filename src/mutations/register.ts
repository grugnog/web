import gql from 'graphql-tag'

export const REGISTER = gql`
  mutation Register(
    $email: String!
    $password: String
    $googleId: String
    $githubId: Int
  ) {
    register(
      email: $email
      password: $password
      googleId: $googleId
      githubId: $githubId
    ) {
      email
      jwt
      id
    }
  }
`

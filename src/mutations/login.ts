import gql from 'graphql-tag'

export const LOGIN = gql`
  mutation Login(
    $email: String!
    $password: String
    $googleId: String
    $githubId: Int
  ) {
    login(
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

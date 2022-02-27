import gql from 'graphql-tag'

const EMAIL_VERIFIED_SUBSCRIPTION = gql`
  subscription emailVerified($userId: Int) {
    emailVerified(userId: $userId) {
      emailConfirmed
    }
  }
`

export { EMAIL_VERIFIED_SUBSCRIPTION }

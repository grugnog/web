import gql from 'graphql-tag'

const EMAIL_VERIFIED_SUBSCRIPTION = gql`
  subscription emailVerified {
    emailVerified {
      emailConfirmed
    }
  }
`

export { EMAIL_VERIFIED_SUBSCRIPTION }

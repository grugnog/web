import gql from 'graphql-tag'

export const UPDATE_USER = gql`
  mutation UpdateUser($password: String, $newPassword: String, $email: String) {
    updateUser(password: $password, newPassword: $newPassword, email: $email) {
      code
      success
      message
      user {
        jwt
        id
        activeSubscription
        role
        email
        websites {
          url
          _id
          domain
          pages {
            domain
            url
            issues {
              code
              type
              selector
              message
              context
              recurrence
            }
          }
        }
      }
    }
  }
`

// todo: add plan as param
export const ADD_PAYMENT_SUBSCRIPTION = gql`
  mutation AddPaymentSubscription(
    $email: String
    $stripeToken: String
    $yearly: Boolean
  ) {
    addPaymentSubscription(
      email: $email
      stripeToken: $stripeToken
      yearly: $yearly
    ) {
      code
      success
      message
      user {
        jwt
        id
        activeSubscription
        role
      }
    }
  }
`

export const CANCEL_SUBSCRIPTION = gql`
  mutation CancelSubscription($email: String) {
    cancelSubscription(email: $email) {
      code
      success
      message
      user {
        id
        jwt
      }
    }
  }
`

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String) {
    forgotPassword(email: $email) {
      email
    }
  }
`

export const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String, $resetCode: String) {
    resetPassword(email: $email, resetCode: $resetCode) {
      email
      jwt
    }
  }
`

export const CONFIRM_EMAIL = gql`
  mutation ConfirmEmail($email: String) {
    confirmEmail(email: $email) {
      code
      success
      message
    }
  }
`

export const SET_PAGESPEED_KEY = gql`
  mutation SetPageSpeedKey($pageSpeedApiKey: String) {
    setPageSpeedKey(pageSpeedApiKey: $pageSpeedApiKey) {
      code
      success
      message
      user {
        id
        pageSpeedApiKey
      }
    }
  }
`
export const TOGGLE_ALERT = gql`
  mutation ToggleAlert($alertEnabled: Boolean) {
    toggleAlert(alertEnabled: $alertEnabled) {
      code
      success
      message
      alertEnabled
    }
  }
`

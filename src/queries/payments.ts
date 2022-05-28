import gql from 'graphql-tag'

const GET_PAYMENTS = gql`
  query getUser {
    user {
      id
      email
      loggedIn
      alertEnabled
      role
      activeSubscription
      invoice {
        amount_due
        amount_paid
        amount_remaining
        next_payment_attempt
        period_end
        period_start
        total
        sub_total
        paid
        billing_reason
      }
      paymentSubscription {
        id
        start_date
        status
        billing_cycle_anchor
        days_until_due
        current_period_end
        current_period_start
        created
        collection_method
        ended_at
        canceled_at
        plan {
          amount_decimal
          id
          object
          nickname
          currency
          interval
          amount
        }
      }
    }
  }
`

export { GET_PAYMENTS }

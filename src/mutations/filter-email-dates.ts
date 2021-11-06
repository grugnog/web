import gql from 'graphql-tag'

export const FILTER_EMAIL_DATES = gql`
  mutation FilterEmailDates($emailFilteredDates: [Int]) {
    filterEmailDates(emailFilteredDates: $emailFilteredDates) {
      emailFilteredDates
    }
  }
`

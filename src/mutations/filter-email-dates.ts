import gql from 'graphql-tag'

export const FILTER_EMAIL_DATES = gql`
  mutation FilterEmailDates($emailFilteredDates: [Int], $morning: Boolean) {
    filterEmailDates(
      emailFilteredDates: $emailFilteredDates
      morning: $morning
    ) {
      emailFilteredDates
    }
  }
`

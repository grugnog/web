import gql from 'graphql-tag'

const GET_USER = gql`
  query getUser {
    user {
      id
      email
      loggedIn
      alertEnabled
      role
      activeSubscription
      emailConfirmed
      emailFilteredDates
      passwordRequired
      apiUsage {
        usage
        lastScanDate
        usageLimit
      }
    }
  }
`

export const updateUserCache = {
  update(cache: any, { data: { cachedUser } }: any) {
    const variables = {
      alertEnabled: cachedUser.alertEnabled,
    }
    const { user } = cache.readQuery({
      query: GET_USER,
      variables,
    })

    cache.writeQuery({
      query: GET_USER,
      variables,
      data: {
        user: {
          ...user,
        },
      },
    })
  },
}

export { GET_USER }

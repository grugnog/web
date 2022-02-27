import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_USER_STATE = gql`
  query getUserState {
    user @client {
      id
      email
      role
      isLoggedIn
      jwt
    }
  }
`

const defaultState = {
  user: null,
}

export function useUser() {
  const client = useApolloClient()
  const { data } = useQuery(GET_USER_STATE)
  const user = data?.user || defaultState

  const setUserData = (userData: any) => () => {
    client.writeData({
      data: {
        user: {
          ...userData,
          __typename: 'User',
        },
      },
    })
  }

  return {
    user,
    setUserData,
  }
}

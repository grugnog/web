import { useQuery } from '@apollo/react-hooks'
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
  const { data, client } = useQuery(GET_USER_STATE, { ssr: false })
  const user = data?.user || defaultState

  const setUserData = (useUserData: any) => () => {
    client.writeData({
      data: {
        user: {
          ...useUserData,
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

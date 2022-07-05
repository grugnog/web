import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_MINI_PLAYER_STATE = gql`
  query getMiniPlayerState {
    miniPlayer @client {
      open
      data
      title
    }
  }
`

const defultPlayer = {
  open: false,
  title: '',
  data: '',
}

export function useMiniPlayer(toggleModalVisibility?: (a: any) => void) {
  const { data, client } = useQuery(GET_MINI_PLAYER_STATE, { ssr: false })

  const setMiniPlayerContent = (
    open: boolean = false,
    data: any = '',
    title: string = ''
  ) => () => {
    // if the mini player is open and modals are visible perform close.
    if (toggleModalVisibility && open) {
      toggleModalVisibility((m: any) => ({ ...m, open: false }))
    }

    if (typeof data === 'object' && !Object.keys(data).length) {
      // exit if incorrect handling
      return
    }

    client.writeData({
      data: {
        miniPlayer: {
          open,
          data,
          title,
          __typename: 'MiniPlayer',
        },
      },
    })
  }

  return {
    miniPlayer: data?.miniPlayer || defultPlayer,
    setMiniPlayerContent,
  }
}

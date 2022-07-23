import { useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_EVENTS_STATE = gql`
  query getEventsState {
    events @client {
      firstAdd
    }
  }
`

// get local event data - TODO: remove for register onboarding flow
export function useEvents() {
  const [load, { data, client }] = useLazyQuery(GET_EVENTS_STATE, {
    onCompleted: () => {
      const firstWebsiteAdded =
        typeof localStorage !== 'undefined' &&
        localStorage.getItem('firstWebsiteAdded')

      if (firstWebsiteAdded) {
        setEvents({ firstAdd: 'set' })
      }
    },
  })

  const events = data?.events ?? {
    firstAdd: null,
  }

  const setEvents = ({ firstAdd }: any) => {
    if (firstAdd && firstAdd !== 'set') {
      localStorage.setItem('firstWebsiteAdded', '1')
    }

    client.writeData({
      data: {
        events: {
          ...events,
          firstAdd,
          __typename: 'LocalEvents',
        },
      },
    })
  }

  useEffect(() => {
    try {
      load()
    } catch (e) {
      console.error(e)
    }
  }, [load])

  return {
    events,
    setEvents,
  }
}

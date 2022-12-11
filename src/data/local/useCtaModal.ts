import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_CTA_MODAL_STATE = gql`
  query getCtaModalState {
    modalData @client {
      modalOpen
    }
  }
`

export function useCtaModal() {
  const { data, client } = useQuery(GET_CTA_MODAL_STATE, {
    fetchPolicy: 'cache-only',
    ssr: false,
  })
  const modalOpen = data?.modalData?.modalOpen || false

  const setModalOpen = (open: any) => {
    client?.writeData({
      data: {
        modalData: {
          modalOpen: open,
          __typename: 'CtaModal',
        },
      },
    })
  }

  return {
    modalOpen,
    setModalOpen,
  }
}

import { useQuery } from '@apollo/react-hooks'
import { GET_HISTORY } from '@app/queries'

// get user website history
export const useHistory = () => {
  const { data, loading, refetch } = useQuery(GET_HISTORY, {
    variables: { filter: '' },
    fetchPolicy: 'no-cache',
    ssr: false,
  })

  const model = Object.freeze({
    data: data?.user?.history || [],
    loading: loading,
    refetch,
  })

  return model
}

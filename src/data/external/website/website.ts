import { useQuery } from '@apollo/react-hooks'
import { GET_WEBSITE } from '@app/queries'

// get a single website data [NOT USED]
const useWebsite = (url: string, query: boolean = true) => {
  const { data, loading, refetch } = useQuery(GET_WEBSITE, {
    variables: { url },
    skip: !query,
  })

  const model = Object.freeze({
    data,
    loading: loading,
    refetch,
  })

  return model
}

export { useWebsite }

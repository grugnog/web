import { useQuery } from '@apollo/react-hooks'
import { GET_WEBSITE_STATS } from '@app/queries'

// get a single website data [NOT USED]
const useWebsite = (url: string, query: boolean = true) => {
  const { data, loading, refetch, error } = useQuery(GET_WEBSITE_STATS, {
    variables: { url },
    skip: !query,
  })

  return Object.freeze({
    data,
    loading,
    refetch,
    error,
  })
}

export { useWebsite }

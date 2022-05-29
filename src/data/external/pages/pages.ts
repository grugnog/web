import { useQuery } from '@apollo/react-hooks'
import { GET_WEBSITE_PAGES } from '@app/queries/websites'

export const usePagesData = (url?: string | string[]) => {
  const { data, loading, refetch, error } = useQuery(GET_WEBSITE_PAGES, {
    variables: { url },
  })

  const model = Object.freeze({
    data: data?.website?.subDomains,
    loading: loading,
    refetch,
    error,
  })

  return model
}

import { useQuery } from '@apollo/react-hooks'
import { GET_WEBSITE_PAGE_ACTIONS } from '@app/queries/websites'

export const usePageActionsData = (url?: string | string[]) => {
  const { data, loading, refetch, error } = useQuery(GET_WEBSITE_PAGE_ACTIONS, {
    variables: { url },
    ssr: false,
  })

  const model = Object.freeze({
    data: data?.website?.actions,
    loading: loading,
    refetch,
    error,
  })

  return model
}

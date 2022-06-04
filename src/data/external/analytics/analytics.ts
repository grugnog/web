import { useQuery } from '@apollo/react-hooks'
import { GET_ANALYTICS, GET_WEBSITE_ANALYTICS } from '@app/queries'

export const analyticsData = (query: boolean = true) => {
  const { data, loading, refetch, error } = useQuery(GET_ANALYTICS, {
    variables: { filter: '' },
    skip: !query,
  })

  return {
    data: data?.user?.analytics || [],
    loading: loading,
    refetch,
    error,
  }
}

export const useAnalyticsData = (url?: string | string[]) => {
  const { data, loading, refetch, error } = useQuery(GET_WEBSITE_ANALYTICS, {
    variables: { url },
  })

  const model = Object.freeze({
    data: data?.website?.analytics,
    loading: loading,
    refetch,
    error,
  })

  return model
}

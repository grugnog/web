import { useQuery } from '@apollo/react-hooks'
import { GET_ANALYTICS, GET_WEBSITE_ANALYTICS } from '@app/queries'

// get a single page analytics [NOT USED]
export const useAnalytics = (query: boolean = true) => {
  const { data, loading, refetch, error } = useQuery(GET_ANALYTICS, {
    variables: { filter: '' },
    skip: !query,
    ssr: false,
  })

  return {
    data: data?.user?.analytics || [],
    loading: loading,
    refetch,
    error,
  }
}

// get analytics paginated by website
export const useAnalyticsData = (url?: string | string[], all?: boolean) => {
  const variables = { url, limit: 10, offset: 0, all }
  const {
    data,
    loading,
    refetch,
    error,
    fetchMore: fetchMorePages,
  } = useQuery(GET_WEBSITE_ANALYTICS, {
    variables,
    ssr: false,
  })

  const updateQuery = (prev: any, { fetchMoreResult }: any) => {
    if (!fetchMoreResult || !fetchMoreResult?.website?.analytics?.length) {
      return prev
    }

    const analytics = [
      ...prev?.website?.analytics,
      ...fetchMoreResult?.website?.analytics,
    ]

    return Object.assign({}, prev, {
      website: {
        ...prev?.website,
        analytics,
      },
    })
  }

  const analytics = data?.website?.analytics

  // pages page pagination
  const onLoadMore = async () => {
    try {
      await fetchMorePages({
        query: GET_WEBSITE_ANALYTICS,
        variables: {
          ...variables,
          offset: Number(analytics.length || 0),
        },
        updateQuery,
      })
    } catch (e) {
      console.error(e)
    }
  }

  return Object.freeze({
    data: analytics,
    loading: loading,
    refetch,
    error,
    onLoadMore,
  })
}

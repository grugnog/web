import { useQuery } from '@apollo/react-hooks'
import { AppManager } from '@app/managers'
import { GET_WEBSITE_PAGES_PAGINATED } from '@app/queries/websites'

// get pages pagined by website
export const usePagesData = (url?: string | string[]) => {
  const variables = { url, limit: 10, offset: 0 }

  const { data, loading, refetch, error, fetchMore: fetchMorePages } = useQuery(
    GET_WEBSITE_PAGES_PAGINATED,
    {
      variables,
      ssr: false,
    }
  )

  const updateQuery = (prev: any, { fetchMoreResult }: any) => {
    if (!fetchMoreResult) {
      return prev
    }

    if (!fetchMoreResult?.website?.pages?.length) {
      AppManager.toggleSnack(true, 'No more pages exist.')
      return prev
    }

    const pages = [...prev?.website?.pages, ...fetchMoreResult?.website?.pages]

    return Object.assign({}, prev, {
      website: {
        ...prev?.website,
        pages,
      },
    })
  }

  const pages = data?.website?.pages

  // pages page pagination
  const onLoadMorePages = async () => {
    try {
      await fetchMorePages({
        query: GET_WEBSITE_PAGES_PAGINATED,
        variables: {
          ...variables,
          offset: Number(pages.length || 0),
        },
        updateQuery,
      })
    } catch (e) {
      console.error(e)
    }
  }

  const model = Object.freeze({
    data: pages,
    loading: loading,
    refetch,
    error,
    onLoadMorePages: onLoadMorePages,
  })

  return model
}

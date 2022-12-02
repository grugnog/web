import { useQuery } from '@apollo/react-hooks'
import { GET_ISSUE } from '@app/queries'
import { GET_WEBSITE_ISSUES } from '@app/queries/websites'
import { AppManager } from '@app/managers'

// get a single page issue
export const useIssue = (url?: string, skip?: boolean) => {
  const { data, loading, refetch, error } = useQuery(GET_ISSUE, {
    variables: { url: url ? encodeURIComponent(url) : '' },
    skip: !url || skip,
  })

  return Object.freeze({
    issue: data?.issue,
    loading: loading,
    refetch,
    error,
  })
}

// get issues paginated by website
export const useIssueData = (url?: string | string[], all?: boolean) => {
  const variables = { url, limit: 10, offset: 0, all }

  const {
    data,
    loading,
    refetch,
    error,
    fetchMore: fetchMorePages,
  } = useQuery(GET_WEBSITE_ISSUES, {
    variables,
    ssr: false,
  })

  const updateQuery = (prev: any, { fetchMoreResult }: any) => {
    if (!fetchMoreResult || !fetchMoreResult?.website?.issues?.length) {
      AppManager.toggleSnack(true, 'No more issues exist.')
      return prev
    }

    const issues = [
      ...prev?.website?.issues,
      ...fetchMoreResult?.website?.issues,
    ]

    return Object.assign({}, prev, {
      website: {
        ...prev?.website,
        issues,
      },
    })
  }

  const issues = data?.website?.issues

  // pages page pagination
  const onLoadMore = async () => {
    try {
      await fetchMorePages({
        query: GET_WEBSITE_ISSUES,
        variables: {
          ...variables,
          offset: Number(issues.length || 0),
        },
        updateQuery,
      })
    } catch (e) {
      console.error(e)
    }
  }

  const model = Object.freeze({
    data: issues,
    loading: loading,
    refetch,
    error,
    onLoadMore,
  })

  return model
}

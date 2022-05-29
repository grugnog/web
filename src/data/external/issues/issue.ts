import { useQuery } from '@apollo/react-hooks'
import { GET_ISSUE } from '@app/queries'
import { GET_WEBSITE_ISSUES } from '@app/queries/websites'

export const issueData = (url?: string | string[], skip?: boolean) => {
  const { data, loading, refetch, error } = useQuery(GET_ISSUE, {
    variables: { url },
    skip: !url || skip,
  })

  const model = Object.freeze({
    issue: data?.issue,
    loading: loading,
    refetch,
    error,
  })

  return model
}

export const useIssueData = (url?: string | string[]) => {
  const { data, loading, refetch, error } = useQuery(GET_WEBSITE_ISSUES, {
    variables: { url },
  })

  const model = Object.freeze({
    data: data?.website?.issues,
    loading: loading,
    refetch,
    error,
  })

  return model
}

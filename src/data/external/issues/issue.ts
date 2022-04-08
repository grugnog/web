import { useQuery } from '@apollo/react-hooks'
import { GET_ISSUE } from '@app/queries'

export const issueData = (url?: string | string[], skip?: boolean) => {
  const { data, loading, refetch } = useQuery(GET_ISSUE, {
    variables: { url },
    skip,
  })

  const model = Object.freeze({
    issue: data?.issue,
    loading: loading,
    refetch,
  })

  return model
}

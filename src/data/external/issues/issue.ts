import { useQuery } from '@apollo/react-hooks'
import { GET_ISSUE } from '@app/queries'

export const issueData = (url?: string | string[]) => {
  const { data, loading, refetch } = useQuery(GET_ISSUE, {
    variables: { url },
  })

  const model = Object.freeze({
    issue: data?.issue,
    loading: loading,
    refetch,
  })

  return model
}

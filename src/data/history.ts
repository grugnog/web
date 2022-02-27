import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_HISTORY } from '@app/queries'
import { CRAWL_WEBSITE } from '@app/mutations'

export const historyData = () => {
  const { data, loading, refetch } = useQuery(GET_HISTORY, {
    variables: { filter: '' },
    fetchPolicy: 'no-cache',
  })
  const [crawlWebsite, { loading: crawlLoading }] = useMutation(CRAWL_WEBSITE)

  const model = Object.freeze({
    crawlWebsite,
    data: data?.user?.history || [],
    loading: loading || crawlLoading,
    refetch,
  })
  return model
}

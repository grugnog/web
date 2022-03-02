import { useQuery } from '@apollo/react-hooks'
import { GET_WEBSITE } from '@app/queries'

const websiteData = (url: string, query: boolean = true) => {
  const { data, loading, refetch } = useQuery(GET_WEBSITE, {
    variables: { url },
    skip: !query,
  })

  const model = Object.freeze({
    data,
    loading: loading,
    refetch,
  })

  return model
}

export { websiteData }

import { useQuery } from '@apollo/react-hooks'
import { GET_WEBSITE_HTML } from '@app/queries'

const websiteHtmlData = (url: string, query: boolean = true) => {
  const { data, loading } = useQuery(GET_WEBSITE_HTML, {
    variables: { url },
    skip: !query,
  })

  const model = Object.freeze({
    data,
    loading: loading,
  })

  return model
}

export { websiteHtmlData }

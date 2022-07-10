import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_SCRIPT, GET_WEBSITE_SCRIPTS } from '@app/queries'
import { UPDATE_SCRIPT } from '@app/mutations'
import { SCRIPTS_CDN_URL_HOST } from '@app/configs'
import { AppManager } from '@app/managers'

// single script queyr
export const useScript = (url?: string | string[], skip?: boolean) => {
  const { data, loading, refetch } = useQuery(GET_SCRIPT, {
    variables: { filter: '', url },
    skip,
  })

  const [
    updateScript,
    { data: updateScriptData, loading: scriptLoading },
  ] = useMutation(UPDATE_SCRIPT)

  const { user } = data ?? { user: undefined }
  const { script } = user ?? { script: undefined }

  const scriptIncluded = !!script

  // TODO: remove clientside appending
  const cdnUrl = scriptIncluded && `${SCRIPTS_CDN_URL_HOST}/${script?.cdnUrl}`
  const cdnUrlMinified =
    scriptIncluded && `${SCRIPTS_CDN_URL_HOST}/${script?.cdnUrlMinified}`

  // adjust script to API endpoint
  const currentScript = scriptIncluded
    ? Object.assign({}, script || {}, { cdnUrl }, { cdnUrlMinified })
    : null

  return {
    script: currentScript,
    loading: loading,
    refetch,
    updateScript,
    updateScriptData: updateScriptData?.updateScript?.script,
    scriptLoading,
  }
}

// get scripts paginated by website
export const useScriptsData = (url?: string | string[], all?: boolean) => {
  const variables = { url, limit: 15, offset: 0, all }

  const { data, loading, refetch, error, fetchMore: fetchMorePages } = useQuery(
    GET_WEBSITE_SCRIPTS,
    {
      variables,
      ssr: false,
    }
  )

  const updateQuery = (prev: any, { fetchMoreResult }: any) => {
    if (!fetchMoreResult || !fetchMoreResult?.website?.scripts?.length) {
      AppManager.toggleSnack(true, 'No more scripts exist.')
      return prev
    }

    const scripts = [
      ...prev?.website?.scripts,
      ...fetchMoreResult?.website?.scripts,
    ]

    return Object.assign({}, prev, {
      website: {
        ...prev?.website,
        scripts,
      },
    })
  }

  const pages = data?.website?.scripts

  // pages scripts pagination
  const onLoadMore = async () => {
    try {
      await fetchMorePages({
        query: GET_WEBSITE_SCRIPTS,
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
    onLoadMore,
  })

  return model
}

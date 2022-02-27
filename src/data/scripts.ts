import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_SCRIPTS, GET_SCRIPT } from '@app/queries'
import { UPDATE_SCRIPT } from '@app/mutations'
import { SCRIPTS_CDN_URL_HOST } from '@app/configs'

export const scriptData = (url?: string | string[], skip?: boolean) => {
  const { data, loading, refetch } = useQuery(GET_SCRIPT, {
    variables: { filter: '', url },
    skip,
  })

  const scriptIncluded = !!data?.user?.script
  const cdnUrl =
    scriptIncluded && `${SCRIPTS_CDN_URL_HOST}/${data?.user?.script?.cdnUrl}`
  const cdnUrlMinified =
    scriptIncluded &&
    `${SCRIPTS_CDN_URL_HOST}/${data?.user?.script?.cdnUrlMinified}`

  const script = scriptIncluded
    ? Object.assign({}, data?.user?.script || {}, cdnUrl, cdnUrlMinified)
    : null

  const [
    updateScript,
    { data: updateScriptData, loading: scriptLoading },
  ] = useMutation(UPDATE_SCRIPT)

  return {
    script,
    loading: loading,
    refetch,
    updateScript,
    updateScriptData,
    scriptLoading,
  }
}

export const scriptsData = (skip?: boolean) => {
  const { data, loading, refetch } = useQuery(GET_SCRIPTS, {
    variables: { filter: '' },
    skip,
  })

  return {
    data: data?.user?.scripts || [],
    loading: loading,
    refetch,
  }
}

import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_SCRIPTS, GET_SCRIPT, GET_WEBSITE_SCRIPTS } from '@app/queries'
import { UPDATE_SCRIPT } from '@app/mutations'
import { SCRIPTS_CDN_URL_HOST } from '@app/configs'

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
    updateScriptData,
    scriptLoading,
  }
}

export const scriptsData = (skip?: boolean) => {
  const { data, loading, refetch } = useQuery(GET_SCRIPTS, {
    variables: { filter: '' },
    skip,
  })
  const { activeSubscription, scripts } = data?.user ?? {}

  return {
    activeSubscription,
    data: scripts || [], // return the scripts as the primary data for hook
    loading: loading,
    refetch,
  }
}

export const useScriptsData = (url?: string | string[]) => {
  const { data, loading, refetch, error } = useQuery(GET_WEBSITE_SCRIPTS, {
    variables: { url },
  })

  const model = Object.freeze({
    data: data?.website?.scripts,
    loading: loading,
    refetch,
    error,
  })

  return model
}

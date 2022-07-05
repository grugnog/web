import { useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { frameDom } from '@app/managers'

const GET_AUTOFIX_STATE = gql`
  query getAutoFixState {
    autoFixEnabled @client
  }
`

export function useAutoFix(script: any) {
  const { data, client } = useQuery(GET_AUTOFIX_STATE, { ssr: false })
  const autoFixEnabled = data?.autoFixEnabled
  const { dom } = frameDom

  const setAutoFix = (enabled: any) => {
    client.writeData({
      data: {
        autoFixEnabled: enabled,
      },
    })
  }

  useEffect(() => {
    if (dom && script?.cdnUrl) {
      let hasCdn = dom?.querySelector(`script[src$="${script.cdnUrlMinified}"]`)
      if (!hasCdn) {
        dom?.querySelector(`script[src$="${script.cdnUrl}"]`)
      }
      if (hasCdn) {
        hasCdn.setAttribute('data-a11y-cdn', 'true')
        setAutoFix(true)
      }
    }
  }, [dom, script])

  return {
    autoFixEnabled,
    setAutoFix,
  }
}

import { useMemo } from 'react'

// format lighthouse data returned
export const useLighthouse = (insight: any) => {
  return useMemo(() => {
    if (insight && insight?.json) {
      try {
        const parsedResult = JSON.parse(insight?.json)

        if (
          parsedResult &&
          ('lighthouseVersion' in parsedResult ||
            'requestedUrl' in parsedResult)
        ) {
          return parsedResult
          // return online results <-- tmp remove from endpoint
        } else if (parsedResult && 'lighthouseResult' in parsedResult) {
          return parsedResult?.lighthouseResult
        } else {
          return null
        }
      } catch (e) {
        console.error(`Error parsing lighthouse: ${e}`)
        return null
      }
    }
    return null
  }, [insight])
}

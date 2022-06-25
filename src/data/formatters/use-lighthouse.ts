import { useMemo } from 'react'

// format lighthouse data returned
export const useLighthouse = (insight: any) => {
  return useMemo(() => {
    // TODO: Handles Deprecated pages
    if (insight && insight?.json) {
      try {
        const parsedResult = JSON.parse(insight?.json)

        if (parsedResult && 'lighthouseVersion' in parsedResult) {
          return parsedResult
          // return online results <-- tmp remove from endpoint
        } else if (parsedResult) {
          return parsedResult?.lighthouseResult
        }
      } catch (_) {}
    }
    return null
  }, [insight])
}

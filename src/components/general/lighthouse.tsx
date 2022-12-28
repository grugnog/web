import { memo, useMemo } from 'react'
import { useLighthouse } from '@app/data/formatters/use-lighthouse'
import { ErrorBoundary } from './error-boundary'
import ReportViewer from 'next-lighthouse'
import { useTheme } from 'next-themes'

// Lighthouse viewer that converts a json string into a report.
export function LighthouseComponent({
  insight,
  lighthouseVisible = true,
  id,
}: any) {
  const { theme } = useTheme()
  const parsedInsight = useLighthouse(insight)

  const lhId = useMemo(() => {
    if (!id && parsedInsight) {
      try {
        const domain = parsedInsight?.requestedUrl
          .replace('https://', '')
          .replace('http://', '')
          .replace(/\./g, '-')
          .replace(/\//g, '-')

        return domain
      } catch (e) {
        console.error(e)
      }
    }
    return id
  }, [parsedInsight, id])

  if (!parsedInsight && !lighthouseVisible) {
    return null
  }

  return (
    <ErrorBoundary>
      <ReportViewer json={parsedInsight} initFeatures={false} id={lhId} darkMode={theme === "dark"} />
    </ErrorBoundary>
  )
}

export const Lighthouse = memo(LighthouseComponent)

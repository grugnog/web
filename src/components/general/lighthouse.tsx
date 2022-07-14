import { memo, useMemo } from 'react'
import { useLighthouse } from '@app/data/formatters/use-lighthouse'
import { ErrorBoundary } from './error-boundary'
import ReportViewer from 'next-lighthouse'

// Lighthouse viewer that converts a json string into a report.
export function LighthouseComponent({
  insight,
  lighthouseVisible = true,
  id,
}: any) {
  const parsedInsight = useLighthouse(insight)

  const lhId = useMemo(() => {
    if (!id && parsedInsight) {
      try {
        const { hostname } = new URL(parsedInsight?.requestedUrl)
        const domain = hostname
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

  return (
    <ErrorBoundary>
      <div
        className={`ease-in ${
          parsedInsight && lighthouseVisible
            ? 'visible opacity-1'
            : 'hidden opacity-0'
        }`}
      >
        <ReportViewer json={parsedInsight} initFeatures={false} id={lhId} />
      </div>
    </ErrorBoundary>
  )
}

export const Lighthouse = memo(LighthouseComponent)

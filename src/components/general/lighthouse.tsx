import { memo } from 'react'
import { useLighthouse } from '@app/data/formatters/use-lighthouse'
import { ErrorBoundary } from './error-boundary'
import ReportViewer from 'next-lighthouse'

export function LighthouseComponent({ insight, lighthouseVisible }: any) {
  const parsedInsight = useLighthouse(insight)

  return parsedInsight ? (
    <ErrorBoundary>
      <div
        className={`${
          parsedInsight && lighthouseVisible ? 'visible' : 'hidden'
        }`}
      >
        <ReportViewer json={parsedInsight} />
      </div>
    </ErrorBoundary>
  ) : null
}

export const Lighthouse = memo(LighthouseComponent)

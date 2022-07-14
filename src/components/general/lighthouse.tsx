import { memo } from 'react'
import { useLighthouse } from '@app/data/formatters/use-lighthouse'
import { ErrorBoundary } from './error-boundary'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const ReportViewer = dynamic(() => import('next-lighthouse'), {
  suspense: true,
}) as any

export function LighthouseComponent({ insight, lighthouseVisible }: any) {
  const parsedInsight = useLighthouse(insight)

  return parsedInsight ? (
    <ErrorBoundary>
      <div
        className={`${
          parsedInsight && lighthouseVisible ? 'visible' : 'hidden'
        }`}
      >
        <Suspense fallback={`Loading...`}>
          <ReportViewer json={parsedInsight} />
        </Suspense>
      </div>
    </ErrorBoundary>
  ) : null
}

export const Lighthouse = memo(LighthouseComponent)

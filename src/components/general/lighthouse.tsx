import { memo, useMemo } from 'react'
import { useLighthouse } from '@app/data/formatters/use-lighthouse'
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
        return parsedInsight?.requestedUrl
          .replace('https://', '')
          .replace('http://', '')
          .replace(/\./g, '-')
          .replace(/\//g, '-')
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
    <ReportViewer json={parsedInsight} id={lhId} darkMode={theme === 'dark'} />
  )
}

export const Lighthouse = memo(LighthouseComponent)

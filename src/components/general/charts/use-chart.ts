import { Analytic, Website } from '@app/types'
import { useMemo } from 'react'

// handle formatting the line chart data
export const useLineChart = ({ data }: { data?: Analytic[] | Website[] }) => {
  const props = useMemo(() => {
    const firstSet = []
    const secondSet = []
    const tickSet = []

    let maxErrorValue = 0
    let maxWarningValue = 0

    let tErrors = 0
    let tWarnings = 0

    let determinedType = ''

    if (data && data.length) {
      for (let i = 0; i < data.length; i++) {
        const item = data[i]

        let label = ''
        let errorCount = 0
        let warningCount = 0

        if ('issuesInfo' in item) {
          errorCount = item.issuesInfo?.errorCount ?? 0
          warningCount = item.issuesInfo?.warningCount ?? 0
          label = item.domain
          if (!determinedType) {
            determinedType = 'website'
          }
        } else if ('pageUrl' in item) {
          errorCount = item.errorCount ?? 0
          warningCount = item.warningCount ?? 0
          label = item.pageUrl || ''
          if (!determinedType) {
            determinedType = 'page'
          }
        }

        if (errorCount) {
          tErrors += errorCount

          if (errorCount > maxErrorValue) {
            maxErrorValue = errorCount
          }
        }

        if (warningCount) {
          tWarnings += warningCount
          if (warningCount && warningCount > maxWarningValue) {
            maxWarningValue = warningCount
          }
        }

        firstSet.push({
          x: i,
          y: errorCount,
          l: `${errorCount} error${errorCount === 1 ? '' : 's'} - ${label}`,
        })
        secondSet.push({
          x: i,
          y: warningCount,
          l: `${warningCount} warning${
            warningCount === 1 ? '' : 's'
          } - ${label}`,
        })
        tickSet.push(label)
      }
    }

    return {
      first: firstSet,
      second: secondSet,
      ticks: tickSet,
      highestError: maxErrorValue,
      highestWarning: maxWarningValue,
      totalWarnings: tWarnings,
      totalErrors: tErrors,
      determinedType,
    }
  }, [data])

  return props
}

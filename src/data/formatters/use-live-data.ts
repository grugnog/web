import { Analytic, Issue, IssueMeta } from '@app/types'
import { useMemo } from 'react'

// format live data for a website
export const useWebsiteLiveData = ({
  issues,
  issuesInfo,
}: {
  issues?: Issue | Issue[]
  issuesInfo?: IssueMeta | undefined
}) => {
  const { errorCount, warningCount, totalIssues, issuesFixedByCdn, liveData } =
    useMemo(() => {
      let errors = 0
      let warnings = 0
      let notices = 0
      let liveData: Analytic[] = []

      // todo: only use live feed data
      if (issues && Array.isArray(issues) && issues.length) {
        issues.forEach((iss: any) => {
          const pageIssues = iss?.issues
          let currentErrors = 0
          let currentWarnings = 0
          let currentNotices = 0

          pageIssues?.forEach((page: Issue) => {
            if (page?.type === 'error') {
              currentErrors++
            }
            if (page?.type === 'warning') {
              currentWarnings++
            }
            if (page?.type === 'notice') {
              currentNotices++
            }
            errors += currentErrors
            warnings += currentWarnings
            notices += currentNotices
          })

          liveData.push({
            pageUrl: iss.pageUrl,
            errorCount: currentErrors,
            warningCount: currentWarnings,
            noticeCount: currentNotices,
          })
        })
      } else if (issuesInfo) {
        errors = issuesInfo.errorCount || 0
        warnings = issuesInfo.warningCount || 0
        notices = issuesInfo.noticeCount || 0
      }

      return {
        issuesFixedByCdn: issuesInfo?.issuesFixedByCdn,
        errorCount: errors,
        warningCount: warnings,
        noticeCount: notices,
        totalIssues: errors + warnings + notices,
        liveData,
      }
    }, [issues, issuesInfo])

  return { errorCount, warningCount, totalIssues, issuesFixedByCdn, liveData }
}

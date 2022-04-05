import React, { memo, useMemo } from 'react'
import { Chip, Tooltip } from '@material-ui/core'
import {
  GrCircleAlert,
  GrConfigure,
  GrFormCalendar,
  GrMagic,
} from 'react-icons/gr'

// TODO: REFACTOR WITH Secondary (BASE)
export function WebsiteSecondaryComponent({
  issues = [],
  lastScanDate,
  issuesInfo,
  pageHeaders,
}: any) {
  const { allPageIssues } = useMemo(() => {
    let allPageIssues = 0
    // let errorsCount = 0
    // let issuesCount = 0

    if (issues?.length) {
      allPageIssues = issues.reduceRight((a: number, item: any) => {
        return a + item?.issues?.length || 0
      }, 0)
    }

    return { allPageIssues }
  }, [issues])

  const {
    possibleIssuesFixedByCdn,
    issuesFixedByCdn,
    totalIssues: totalIssuesOnPage,
  } = issuesInfo ?? {}

  const mainIssues =
    totalIssuesOnPage > allPageIssues ? totalIssuesOnPage : allPageIssues

  const pageIssueCount = issues?.length || 0

  return (
    <div className={'flex space-x-2'}>
      {pageIssueCount ? (
        <Tooltip
          title={`${mainIssues} possible issue${
            totalIssuesOnPage === 1 ? '' : 's'
          } across ${pageIssueCount} page${
            pageIssueCount === 1 || !pageIssueCount ? '' : 's'
          }`}
          placement={'right'}
        >
          <Chip
            variant='outlined'
            size='small'
            avatar={<GrCircleAlert />}
            label={mainIssues}
          />
        </Tooltip>
      ) : null}
      {possibleIssuesFixedByCdn && totalIssuesOnPage ? (
        <Tooltip
          title={
            issuesFixedByCdn
              ? `${issuesFixedByCdn} issues fixed from CDN out of ${totalIssuesOnPage} for current page.`
              : `${possibleIssuesFixedByCdn} out of ${totalIssuesOnPage} issues on the current page can be fixed instantly with our custom CDN.`
          }
          placement={'right'}
        >
          <Chip
            variant='outlined'
            size='small'
            avatar={<GrMagic />}
            label={
              issuesFixedByCdn
                ? `${issuesFixedByCdn}/${totalIssuesOnPage}`
                : `${possibleIssuesFixedByCdn}/${totalIssuesOnPage}`
            }
          />
        </Tooltip>
      ) : null}
      {lastScanDate ? (
        <Tooltip title={`Last scan was at ${lastScanDate}`} placement={'right'}>
          <Chip
            variant='outlined'
            size='small'
            avatar={<GrFormCalendar />}
            label={lastScanDate}
          />
        </Tooltip>
      ) : null}
      {pageHeaders ? (
        <Tooltip
          title={`Custom headers ${JSON.stringify(
            pageHeaders.map((item: any) => ({ [item.key]: item.value }))
          )}`}
          placement={'right'}
        >
          <Chip
            variant='outlined'
            size='small'
            avatar={<GrConfigure />}
            label={`${pageHeaders?.length} custom header${
              pageHeaders?.length === 1 ? '' : 's'
            }`}
          />
        </Tooltip>
      ) : null}
    </div>
  )
}

export const WebsiteSecondary = memo(WebsiteSecondaryComponent)

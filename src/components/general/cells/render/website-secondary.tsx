import React, { memo, useMemo } from 'react'
import { useMediaQuery, Chip, Tooltip } from '@material-ui/core'
import {
  Update as CalendarIcon,
  Error as IssuesIcon,
  Healing as HealingIcon,
  Policy as PolicyIcon,
} from '@material-ui/icons'
import { format } from 'date-fns'

// TODO: REFACTOR WITH Secondary (BASE)
export function WebsiteSecondaryComponent({
  issues = [],
  lastScanDate,
  issuesInfo,
  pageHeaders,
}: any) {
  const matches = useMediaQuery('(min-width:600px)')

  const allPageIssues = useMemo(() => {
    if (issues?.length) {
      return issues.reduceRight(
        (a: number, item: any) => a + item?.issues?.length || 0,
        0
      )
    }
    return 0
  }, [issues])

  const lastScan = new Date(lastScanDate ? lastScanDate : null)
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
          title={`${mainIssues} issue${
            totalIssuesOnPage === 1 ? '' : 's'
          } across ${pageIssueCount} page${
            pageIssueCount === 1 || !pageIssueCount ? '' : 's'
          }`}
          placement={'right'}
        >
          <Chip
            variant='outlined'
            size='small'
            avatar={<IssuesIcon />}
            label={`${mainIssues} issue${totalIssuesOnPage === 1 ? '' : 's'}`}
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
            avatar={<HealingIcon />}
            label={
              issuesFixedByCdn
                ? `${issuesFixedByCdn}/${totalIssuesOnPage}`
                : `${possibleIssuesFixedByCdn}/${totalIssuesOnPage}`
            }
          />
        </Tooltip>
      ) : null}
      {lastScan && matches ? (
        <Tooltip
          title={`Last scan was at ${format(lastScan, 'MMMM d, yyyy hh:mm a')}`}
          placement={'right'}
        >
          <Chip
            variant='outlined'
            size='small'
            avatar={<CalendarIcon />}
            label={format(lastScan, 'MM/dd/yyyy')}
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
            avatar={<PolicyIcon color={'primary'} />}
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

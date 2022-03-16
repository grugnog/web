import React, { useMemo } from 'react'
import { format } from 'date-fns'
import { Chip, Tooltip } from '@material-ui/core'
import {
  Update as CalendarIcon,
  Error as IssuesIcon,
  Healing as HealingIcon,
  Policy as PolicyIcon,
} from '@material-ui/icons'
import { PageLoad } from './page-load'

export function RenderSecondary({
  adaScore,
  pageLoadTime = {
    duration: 0,
  },
  issues = [],
  lastScanDate,
  issuesInfo,
  pageHeaders,
}: any) {
  const possibleIssuesFixedByCdn = issuesInfo?.possibleIssuesFixedByCdn
  const totalIssuesOnPage = issuesInfo?.totalIssues
  const issuesFixedByCdn = issuesInfo?.issuesFixedByCdn
  const lastScan = new Date(lastScanDate ? lastScanDate : null)

  const allPageIssues = useMemo(() => {
    if (issues?.length) {
      return issues.reduceRight(
        (a: number, item: any) => a + item?.issues?.length || 0,
        0
      )
    }
    return 0
  }, [issues])

  const mainIssues =
    totalIssuesOnPage > allPageIssues ? totalIssuesOnPage : allPageIssues

  return (
    <div className={'flex space-x-2'}>
      {mainIssues && adaScore !== 100 ? (
        <Tooltip
          title={`${mainIssues} issue${
            totalIssuesOnPage === 1 ? '' : 's'
          } across ${issues?.length || 1} page${
            issues?.length === 1 || !issues.length ? '' : 's'
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
      <PageLoad pageLoadTime={pageLoadTime} />
      {possibleIssuesFixedByCdn && totalIssuesOnPage ? (
        <Tooltip
          title={
            issuesFixedByCdn
              ? `${issuesFixedByCdn} issues fixed from CDN out of ${totalIssuesOnPage} for current page`
              : `${possibleIssuesFixedByCdn} out of ${totalIssuesOnPage} issues on the current page can be fixed instantly with our custom CDN.`
          }
          placement={'right'}
        >
          <Chip
            variant='outlined'
            size='small'
            avatar={<HealingIcon color={'primary'} />}
            label={
              issuesFixedByCdn
                ? `${issuesFixedByCdn}/${totalIssuesOnPage}`
                : `${possibleIssuesFixedByCdn}/${totalIssuesOnPage}`
            }
          />
        </Tooltip>
      ) : null}
      {lastScan ? (
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
            avatar={<PolicyIcon />}
            label={`${pageHeaders?.length} custom header${
              pageHeaders?.length === 1 ? '' : 's'
            }`}
          />
        </Tooltip>
      ) : null}
    </div>
  )
}

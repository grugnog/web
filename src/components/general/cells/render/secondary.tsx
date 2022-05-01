import React, { memo, useMemo } from 'react'
import { Chip, Tooltip } from '@material-ui/core'
import { PageLoad } from './page-load'
import { GrMagic, GrCircleAlert, GrConfigure, GrCalendar } from 'react-icons/gr'
import { format } from 'date-fns'

export function RenderSecondaryComponent({
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
  const lastScan = lastScanDate

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

  const chipStyle = { width: 12, height: 12 }

  return (
    <div className={'flex space-x-2'}>
      {mainIssues && adaScore !== 100 ? (
        <Tooltip
          title={`${mainIssues} possible issue${
            totalIssuesOnPage === 1 ? '' : 's'
          }`}
          placement={'right'}
        >
          <Chip
            variant='outlined'
            size='small'
            avatar={<GrCircleAlert style={chipStyle} />}
            label={mainIssues}
          />
        </Tooltip>
      ) : null}
      <PageLoad
        durationFormated={pageLoadTime?.durationFormated}
        duration={pageLoadTime?.duration}
        style={chipStyle}
      />
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
            avatar={<GrMagic style={chipStyle} />}
            label={
              issuesFixedByCdn
                ? `${issuesFixedByCdn}/${totalIssuesOnPage}`
                : `${possibleIssuesFixedByCdn}/${totalIssuesOnPage}`
            }
          />
        </Tooltip>
      ) : null}
      {lastScan ? (
        <Tooltip title={`Last scan was at ${lastScan}`} placement={'right'}>
          <Chip
            variant='outlined'
            size='small'
            avatar={<GrCalendar style={chipStyle} />}
            className={'flex sm:text-sm'}
            label={format(new Date(lastScan), 'dd/MM/yyyy')}
          />
        </Tooltip>
      ) : null}
      {pageHeaders?.length ? (
        <Tooltip
          title={`Custom headers ${JSON.stringify(
            pageHeaders.map((item: any) => ({ [item.key]: item.value }))
          )}`}
          placement={'right'}
        >
          <Chip
            variant='outlined'
            size='small'
            avatar={<GrConfigure style={chipStyle} />}
            label={`${pageHeaders?.length} custom header${
              pageHeaders?.length === 1 ? '' : 's'
            }`}
          />
        </Tooltip>
      ) : null}
    </div>
  )
}

export const RenderSecondary = memo(RenderSecondaryComponent)

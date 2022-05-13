import React, { memo, useMemo } from 'react'
import { Chip, Tooltip } from '@material-ui/core'
import { GrCalendar, GrCircleAlert, GrConfigure, GrMagic } from 'react-icons/gr'
import { format } from 'date-fns'
import { PageLoad } from './page-load'

// TODO: REFACTOR WITH Secondary (BASE)
export function WebsiteSecondaryComponent({
  issues = [],
  lastScanDate,
  issuesInfo,
  pageHeaders,
  pageLoadTime = {
    duration: 0,
  },
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

  const chipStyle = { width: 12, height: 12 }
  const chipRootStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    color: 'rgba(0, 0, 0, 0.7)',
  }

  return (
    <div className={'flex gap-x-2 gap-y-1 overflow-x-auto'}>
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
            size='small'
            style={chipRootStyle}
            avatar={<GrCircleAlert style={chipStyle} />}
            label={mainIssues}
          />
        </Tooltip>
      ) : null}
      {pageLoadTime?.duration ? (
        <PageLoad
          durationFormated={pageLoadTime?.durationFormated}
          duration={pageLoadTime?.duration}
          style={chipRootStyle}
          chipStyle={chipStyle}
        />
      ) : null}
      {possibleIssuesFixedByCdn && totalIssuesOnPage ? (
        <Tooltip
          title={
            issuesFixedByCdn
              ? `${issuesFixedByCdn} issue${
                  issuesFixedByCdn === 1 ? '' : ''
                } fixed from CDN out of ${totalIssuesOnPage} for current page.`
              : `${possibleIssuesFixedByCdn} out of ${totalIssuesOnPage} issues on the current page can be fixed instantly with our custom CDN.`
          }
          placement={'right'}
        >
          <Chip
            size='small'
            style={chipRootStyle}
            avatar={<GrMagic style={chipStyle} />}
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
            style={chipRootStyle}
            size='small'
            avatar={<GrCalendar style={chipStyle} />}
            label={format(new Date(lastScanDate), 'dd/MM/yyyy')}
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
            style={chipRootStyle}
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

export const WebsiteSecondary = memo(WebsiteSecondaryComponent)

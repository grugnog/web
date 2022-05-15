import React, { memo } from 'react'
import { Chip, Tooltip } from '@material-ui/core'
import { GrCalendar, GrCircleAlert, GrConfigure, GrMagic } from 'react-icons/gr'
import { format } from 'date-fns'
import { PageLoad } from './page-load'

const chipStyle = { width: 12, height: 12 }
const chipRootStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
  color: 'rgba(0, 0, 0, 0.7)',
}

// TODO: REFACTOR WITH Secondary (BASE)
export function WebsiteSecondaryComponent({
  pageIssueCount = 0,
  lastScanDate,
  issuesInfo,
  pageHeaders,
  pageLoadTime = {
    duration: 0,
  },
}: any) {
  const { possibleIssuesFixedByCdn, issuesFixedByCdn, totalIssues } =
    issuesInfo ?? {}

  return (
    <div className={'flex space-x-2 overflow-x-hidden hover:overflow-x-auto'}>
      {pageIssueCount ? (
        <Tooltip
          title={`${totalIssues} possible issue${
            totalIssues === 1 ? '' : 's'
          } across ${pageIssueCount} page${
            pageIssueCount === 1 || !pageIssueCount ? '' : 's'
          }`}
          placement={'right'}
        >
          <Chip
            size='small'
            style={chipRootStyle}
            avatar={<GrCircleAlert style={chipStyle} />}
            label={totalIssues}
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
      {possibleIssuesFixedByCdn && totalIssues ? (
        <Tooltip
          title={
            issuesFixedByCdn
              ? `${issuesFixedByCdn} issue${
                  issuesFixedByCdn === 1 ? '' : ''
                } fixed from CDN out of ${totalIssues} for current page.`
              : `${possibleIssuesFixedByCdn} out of ${totalIssues} issues on the current page can be fixed instantly with our custom CDN.`
          }
          placement={'right'}
        >
          <Chip
            size='small'
            style={chipRootStyle}
            avatar={<GrMagic style={chipStyle} />}
            label={
              issuesFixedByCdn
                ? `${issuesFixedByCdn}/${totalIssues}`
                : `${possibleIssuesFixedByCdn}/${totalIssues}`
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

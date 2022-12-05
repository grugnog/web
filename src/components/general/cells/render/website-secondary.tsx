import { memo, useEffect, useMemo, useState } from 'react'
import { Chip, Tooltip } from '@material-ui/core'
import {
  GrCalendar,
  GrCircleAlert,
  GrConfigure,
  GrMagic,
  GrInherit,
  GrRobot,
  GrHost,
  GrPowerShutdown,
} from 'react-icons/gr'
import { format } from 'date-fns'
import { PageLoad } from './page-load'
import { Website } from '@app/types'

const chipStyle = { width: 13, height: 13, color: 'rgb(64,64,64)' }
const chipRootStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  color: 'rgb(64,64,64)',
  border: '1px solid rgb(209 213 219)',
  width: '5rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'left',
  justifyContent: 'flex-start',
  fontSize: '0.77rem',
  // whiteSpace: 'nowrap',
}

// TODO: REFACTOR WITH Secondary (BASE)
export function WebsiteSecondaryComponent({
  pageIssueCount = 0, // TODO: remove for issues info
  lastScanDate,
  issuesInfo,
  pageHeaders,
  pageLoadTime = {
    duration: 0,
  },
  robots,
  subdomains,
  tld,
  shutdown,
  dashboard,
}: Website & {
  pageIssueCount?: number
  adaScore?: number
  dashboard?: boolean
}) {
  const [scanDate, setScanDate] = useState<string>('')
  const {
    possibleIssuesFixedByCdn,
    issuesFixedByCdn,
    totalIssues = 0,
  } = issuesInfo ?? {}

  const { headers, headingJson } = useMemo(() => {
    const heads =
      pageHeaders && pageHeaders.length
        ? pageHeaders
            .filter((item: any) => item.key)
            .map((item: any) => ({ [item.key]: item?.value }))
        : []

    return { headers: heads, headingJson: heads && JSON.stringify(heads) }
  }, [pageHeaders])

  useEffect(() => {
    if (lastScanDate) {
      // format client side date - mismatch hydrated data
      setScanDate(format(new Date(lastScanDate), 'dd/MM/yyyy'))
    }
  }, [setScanDate, lastScanDate])

  return (
    <div
      className={`flex space-x-2 ${
        !dashboard
          ? 'overflow-x-auto max-w-[75vw]'
          : 'overflow-x-auto max-w-[56vw] md:max-w-[50.5vw] lg:max-w-[61.5vw]'
      }`}
    >
      {shutdown ? (
        <Tooltip
          title={`Website scan did not complete. Upgrade your account to increase your duration.`}
          placement={'right'}
        >
          <Chip
            size='small'
            style={chipRootStyle}
            avatar={<GrPowerShutdown style={chipStyle} className={'grIcon'} />}
            label={'Shutdown'}
          />
        </Tooltip>
      ) : null}
      {pageIssueCount ? (
        <Chip
          size='small'
          style={chipRootStyle}
          avatar={<GrCircleAlert style={chipStyle} className={'grIcon'} />}
          label={totalIssues}
        />
      ) : null}
      {subdomains ? (
        <Chip
          size='small'
          style={chipRootStyle}
          avatar={<GrInherit style={chipStyle} className={'grIcon'} />}
          label={'Subdomains'}
        />
      ) : null}
      {tld ? (
        <Chip
          size='small'
          style={chipRootStyle}
          avatar={<GrHost style={chipStyle} className={'grIcon'} />}
          label={'TLD'}
        />
      ) : null}
      {pageLoadTime?.duration && pageLoadTime?.durationFormated ? (
        <PageLoad
          durationFormated={pageLoadTime.durationFormated}
          duration={pageLoadTime.duration}
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
      {typeof robots !== 'undefined' ? (
        <Chip
          style={chipRootStyle}
          size='small'
          avatar={<GrRobot style={chipStyle} className={'grIcon'} />}
          label={robots ? 'Enabled' : 'Disabled'}
        />
      ) : null}
      {lastScanDate ? (
        <Chip
          style={chipRootStyle}
          size='small'
          avatar={<GrCalendar style={chipStyle} className={'grIcon'} />}
          label={scanDate}
        />
      ) : null}
      {headers.length ? (
        <Tooltip title={`Custom headers ${headingJson}`} placement={'right'}>
          <Chip
            style={chipRootStyle}
            size='small'
            avatar={<GrConfigure style={chipStyle} className={'grIcon'} />}
            label={`${headers.length} custom header${
              headers.length === 1 ? '' : 's'
            }`}
          />
        </Tooltip>
      ) : null}
    </div>
  )
}

export const WebsiteSecondary = memo(WebsiteSecondaryComponent)

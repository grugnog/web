import { memo, useMemo } from 'react'
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
  const { possibleIssuesFixedByCdn, issuesFixedByCdn, totalIssues } =
    issuesInfo ?? {}

  const headers = useMemo(
    () =>
      pageHeaders && pageHeaders.length
        ? pageHeaders
            ?.filter((item: any) => item.key)
            ?.map((item: any) => ({ [item.key]: item?.value }))
        : [],
    [pageHeaders]
  )

  return (
    <div
      className={`flex space-x-2 ${
        !dashboard
          ? 'overflow-x-auto max-w-[75vw]'
          : 'overflow-x-auto max-w-[61.5vw]'
      }`}
    >
      {shutdown ? (
        <Tooltip
          title={`Website scan did not complete. Upgrade your account to increase your duration or pay per usage.`}
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
            avatar={<GrCircleAlert style={chipStyle} className={'grIcon'} />}
            label={totalIssues}
          />
        </Tooltip>
      ) : null}
      {subdomains ? (
        <Tooltip title={`Subdomains enabled for website`} placement={'right'}>
          <Chip
            size='small'
            style={chipRootStyle}
            avatar={<GrInherit style={chipStyle} className={'grIcon'} />}
            label={'Subdomains'}
          />
        </Tooltip>
      ) : null}
      {tld ? (
        <Tooltip title={`TLD enabled for website`} placement={'right'}>
          <Chip
            size='small'
            style={chipRootStyle}
            avatar={<GrHost style={chipStyle} className={'grIcon'} />}
            label={'TLD'}
          />
        </Tooltip>
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
        <Tooltip
          title={
            robots ? 'Respects robots.txt file' : 'Ignores robots.txt file'
          }
          placement={'right'}
        >
          <Chip
            style={chipRootStyle}
            size='small'
            avatar={<GrRobot style={chipStyle} className={'grIcon'} />}
            label={robots ? 'Enabled' : 'Disabled'}
          />
        </Tooltip>
      ) : null}
      {lastScanDate ? (
        <Tooltip title={`Last scan was at ${lastScanDate}`} placement={'right'}>
          <Chip
            style={chipRootStyle}
            size='small'
            avatar={<GrCalendar style={chipStyle} className={'grIcon'} />}
            label={format(new Date(lastScanDate), 'dd/MM/yyyy')}
          />
        </Tooltip>
      ) : null}
      {headers && headers?.length ? (
        <Tooltip
          title={`Custom headers ${JSON.stringify(headers)}`}
          placement={'right'}
        >
          <Chip
            style={chipRootStyle}
            size='small'
            avatar={<GrConfigure style={chipStyle} className={'grIcon'} />}
            label={`${headers?.length} custom header${
              headers?.length === 1 ? '' : 's'
            }`}
          />
        </Tooltip>
      ) : null}
    </div>
  )
}

export const WebsiteSecondary = memo(WebsiteSecondaryComponent)

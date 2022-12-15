import { memo, useEffect, useMemo, useState } from 'react'
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
import { Chip } from '@app/components/general/chip'
import { PageLoad } from './page-load'
import { Website } from '@app/types'

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
        <Chip
          title={`Website scan did not complete. Upgrade your account to increase your duration.`}
          avatar={<GrPowerShutdown className={'grIcon'} />}
          label={'Shutdown'}
        />
      ) : null}
      {pageIssueCount ? (
        <Chip
          avatar={<GrCircleAlert className={'grIcon'} />}
          label={totalIssues}
        />
      ) : null}
      {subdomains ? (
        <Chip
          avatar={<GrInherit className={'grIcon'} />}
          label={'Subdomains'}
        />
      ) : null}
      {tld ? (
        <Chip avatar={<GrHost className={'grIcon'} />} label={'TLD'} />
      ) : null}
      {pageLoadTime?.duration && pageLoadTime?.durationFormated ? (
        <PageLoad
          durationFormated={pageLoadTime.durationFormated}
          duration={pageLoadTime.duration}
        />
      ) : null}
      {possibleIssuesFixedByCdn && totalIssues ? (
        <Chip
          avatar={<GrMagic />}
          label={
            issuesFixedByCdn
              ? `${issuesFixedByCdn}/${totalIssues}`
              : `${possibleIssuesFixedByCdn}/${totalIssues}`
          }
          title={
            issuesFixedByCdn
              ? `${issuesFixedByCdn} issue${
                  issuesFixedByCdn === 1 ? '' : ''
                } fixed from CDN out of ${totalIssues} for current page.`
              : `${possibleIssuesFixedByCdn} out of ${totalIssues} issues on the current page can be fixed instantly with our custom CDN.`
          }
        />
      ) : null}
      {typeof robots !== 'undefined' ? (
        <Chip
          avatar={<GrRobot className={'grIcon'} />}
          label={robots ? 'Enabled' : 'Disabled'}
        />
      ) : null}
      {lastScanDate ? (
        <Chip avatar={<GrCalendar className={'grIcon'} />} label={scanDate} />
      ) : null}
      {headers && headers.length ? (
        <Chip
          avatar={<GrConfigure className={'grIcon'} />}
          label={`${headers.length} custom header${
            headers.length === 1 ? '' : 's'
          }`}
          title={`Custom headers ${headingJson}`}
        />
      ) : null}
    </div>
  )
}

export const WebsiteSecondary = memo(WebsiteSecondaryComponent)

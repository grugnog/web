import { memo, useMemo } from 'react'
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
import { classNames } from '@app/utils/classes'

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
}: Website & {
  pageIssueCount?: number
  adaScore?: number | string
  dashboard?: boolean
}) {
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

  const lastScan = useMemo(() => {
    // format client side date - mismatch hydrated data
    if (lastScanDate) {
      return format(new Date(lastScanDate), 'dd/MM/yyyy')
    }
  }, [lastScanDate])

  return (
    <div className={`flex gap-x-1 overflow-x-auto max-w-[75vw]`}>
      {shutdown ? (
        <Chip
          title={`Website scan did not complete. Upgrade your account to increase your scanning up-time.`}
          avatar={<GrPowerShutdown className={'grIcon'} />}
          label={'Shutdown'}
        />
      ) : null}
      {pageIssueCount ? (
        <Chip
          avatar={<GrCircleAlert className={'grIcon'} />}
          label={totalIssues}
          title={`Total page issues between warnings and errors: ${totalIssues}`}
        />
      ) : null}
      <Chip
        className={subdomains ? '' : 'text-gray-400'}
        avatar={<GrInherit className={classNames('grIcon')} />}
        label={`Subdomains`}
        title={`Subdomains ${subdomains ? 'enabled' : 'disabled'}`}
      />
      <Chip
        className={tld ? '' : 'text-gray-400'}
        avatar={<GrHost className={classNames('grIcon')} />}
        label={`TLDs`}
        title={`TLDs ${tld ? 'enabled' : 'disabled'}`}
      />
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
          className={robots ? '' : 'text-gray-400'}
          avatar={<GrRobot className={classNames('grIcon')} />}
          title={`Respect robots.txt ${robots ? 'enabled' : 'disabled'}`}
        />
      ) : null}
      {lastScan ? (
        <Chip avatar={<GrCalendar className={'grIcon'} />} label={lastScan} />
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
      {!robots && pageLoadTime?.duration && pageLoadTime?.durationFormated ? (
        <PageLoad
          durationFormated={pageLoadTime.durationFormated}
          duration={pageLoadTime.duration}
        />
      ) : null}
    </div>
  )
}

export const WebsiteSecondary = memo(WebsiteSecondaryComponent)

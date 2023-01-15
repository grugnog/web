import { memo, useMemo } from 'react'
import { PageLoad } from './page-load'
import { GrMagic, GrCircleAlert, GrConfigure, GrCalendar } from 'react-icons/gr'
import { format } from 'date-fns'
import { Chip } from '@app/components/general/chip'

export function RenderSecondaryComponent({
  accessScore,
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
    <div className={'flex space-x-2'}>
      {mainIssues && accessScore !== 100 ? (
        <Chip
          avatar={<GrCircleAlert className='grIcon' />}
          label={mainIssues}
        />
      ) : null}
      <PageLoad
        durationFormated={pageLoadTime?.durationFormated}
        duration={pageLoadTime?.duration}
      />
      {possibleIssuesFixedByCdn && totalIssuesOnPage ? (
        <Chip
          avatar={<GrMagic className='grIcon' />}
          label={
            issuesFixedByCdn
              ? `${issuesFixedByCdn}/${totalIssuesOnPage}`
              : `${possibleIssuesFixedByCdn}/${totalIssuesOnPage}`
          }
        />
      ) : null}
      {lastScanDate ? (
        <Chip
          avatar={<GrCalendar className='grIcon' />}
          className={'flex sm:text-sm'}
          label={format(new Date(lastScanDate), 'dd/MM/yyyy')}
        />
      ) : null}
      {headers && headers?.length ? (
        <Chip
          avatar={<GrConfigure className='grIcon' />}
          label={`${pageHeaders?.length} custom header${
            pageHeaders?.length === 1 ? '' : 's'
          }`}
          title={`Custom headers ${JSON.stringify(headers)}`}
        />
      ) : null}
    </div>
  )
}

export const RenderSecondary = memo(RenderSecondaryComponent)

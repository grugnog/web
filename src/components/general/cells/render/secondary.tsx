import { memo, useMemo } from 'react'
import { Chip, Tooltip } from '@material-ui/core'
import { PageLoad } from './page-load'
import { GrMagic, GrCircleAlert, GrConfigure, GrCalendar } from 'react-icons/gr'
import { format } from 'date-fns'

const chipStyle = { width: 13, height: 13 }
const chipRootStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
  color: 'rgba(0, 0, 0, 0.7)',
}

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
      {mainIssues && adaScore !== 100 ? (
        <Chip
          size='small'
          style={chipRootStyle}
          avatar={<GrCircleAlert style={chipStyle} />}
          label={mainIssues}
        />
      ) : null}
      <PageLoad
        durationFormated={pageLoadTime?.durationFormated}
        duration={pageLoadTime?.duration}
        style={chipRootStyle}
        chipStyle={chipStyle}
      />
      {possibleIssuesFixedByCdn && totalIssuesOnPage ? (
        <Chip
          style={chipRootStyle}
          size='small'
          avatar={<GrMagic style={chipStyle} />}
          label={
            issuesFixedByCdn
              ? `${issuesFixedByCdn}/${totalIssuesOnPage}`
              : `${possibleIssuesFixedByCdn}/${totalIssuesOnPage}`
          }
        />
      ) : null}
      {lastScanDate ? (
        <Chip
          style={chipRootStyle}
          size='small'
          avatar={<GrCalendar style={chipStyle} />}
          className={'flex sm:text-sm'}
          label={format(new Date(lastScanDate), 'dd/MM/yyyy')}
        />
      ) : null}
      {headers && headers?.length ? (
        <Tooltip
          title={`Custom headers ${JSON.stringify(headers)}`}
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

export const RenderSecondary = memo(RenderSecondaryComponent)

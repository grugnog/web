import React, { memo, useMemo } from 'react'
import { useMediaQuery, Chip, Tooltip } from '@material-ui/core'
import {
  Update as CalendarIcon,
  Error as IssuesIcon,
  Healing as HealingIcon,
  Policy as PolicyIcon,
} from '@material-ui/icons'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { format } from 'date-fns'
import { PageLoad } from './page-load'
import type { MergedTheme } from '@app/theme'

const useStyles = makeStyles(({ palette, breakpoints }: MergedTheme) =>
  createStyles({
    adaScore: {
      fontSize: '12px',
      fontWeight: 800,
      position: 'relative',
    },
    toolTip: {
      background: palette.secondary.main,
      color: '#000',
      fontWeight: 600,
      fontSize: '0.85em',
    },
    row: {
      display: 'flex',
      alignItems: 'center',
    },
    issuesText: {
      marginRight: '7px',
      fontSize: '15px',
      fontWeight: 400,
      [breakpoints.down('sm')]: {
        fontSize: '12px',
      },
    },
    adjust: {
      marginRight: '8px',
      [breakpoints.down('sm')]: {
        marginRight: '5px',
      },
    },
    warning: {
      background: palette.warning.main,
      color: palette.text.secondary,
    },
  })
)

// TODO: REFACTOR WITH Secondary (BASE)
export function WebsiteSecondaryComponent({
  adaScore,
  // cdnConnected,
  // error,
  pageLoadTime = {
    duration: 0,
  },
  issues = [],
  // issue = [],
  // secondaryText,
  // mutatationLoading,
  lastScanDate,
  issuesInfo,
  pageHeaders,
}: any) {
  const classes = useStyles()
  const matches = useMediaQuery('(min-width:600px)')

  const allPageIssues = useMemo(() => {
    if (issues?.length) {
      return issues.reduceRight(
        (a: number, item: any) => a + item?.issues?.length || 0,
        0
      )
    }
    return 0
  }, [issues])

  const lastScan = new Date(lastScanDate ? lastScanDate : undefined)
  const {
    possibleIssuesFixedByCdn,
    issuesFixedByCdn,
    totalIssues: totalIssuesOnPage,
  } = issuesInfo ?? {}

  const mainIssues =
    totalIssuesOnPage > allPageIssues ? totalIssuesOnPage : allPageIssues

  const pageIssueCount = issues?.length || 0

  return (
    <div className={classes.row}>
      {pageIssueCount ? (
        <Tooltip
          title={`${mainIssues} issue${
            totalIssuesOnPage === 1 ? '' : 's'
          } across ${pageIssueCount} page${
            pageIssueCount === 1 || !pageIssueCount ? '' : 's'
          }`}
          placement={'right'}
        >
          <Chip
            className={classes.adjust}
            style={{ borderColor: '#EF9A9A' }}
            variant='outlined'
            size='small'
            avatar={<IssuesIcon style={{ color: '#EF9A9A' }} />}
            label={`${mainIssues} issue${totalIssuesOnPage === 1 ? '' : 's'}`}
          />
        </Tooltip>
      ) : null}
      <PageLoad pageLoadTime={pageLoadTime} mobile={!matches} />
      {possibleIssuesFixedByCdn && totalIssuesOnPage ? (
        <Tooltip
          title={
            issuesFixedByCdn
              ? `${issuesFixedByCdn} issues fixed from CDN out of ${totalIssuesOnPage} for current page.`
              : `${possibleIssuesFixedByCdn} out of ${totalIssuesOnPage} issues on the current page can be fixed instantly with our custom CDN.`
          }
          placement={'right'}
        >
          <Chip
            variant='outlined'
            size='small'
            className={classes.adjust}
            style={{ borderColor: '#F48FB1' }}
            avatar={<HealingIcon style={{ color: '#F48FB1' }} />}
            label={
              issuesFixedByCdn
                ? `${issuesFixedByCdn}/${totalIssuesOnPage}`
                : `${possibleIssuesFixedByCdn}/${totalIssuesOnPage}`
            }
          />
        </Tooltip>
      ) : null}
      {lastScan && matches ? (
        <Tooltip
          title={`Last scan was at ${format(lastScan, 'MMMM d, yyyy hh:mm a')}`}
          placement={'right'}
        >
          <Chip
            variant='outlined'
            size='small'
            style={{ borderColor: '#90CAF9' }}
            className={classes.adjust}
            avatar={<CalendarIcon style={{ color: '#90CAF9' }} />}
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
            className={classes.adjust}
            avatar={<PolicyIcon color={'primary'} />}
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

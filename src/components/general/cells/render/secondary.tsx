import React from 'react'
import { format } from 'date-fns'
import { useMediaQuery, Chip, Typography, Tooltip } from '@material-ui/core'
import {
  Update as CalendarIcon,
  Error as IssuesIcon,
  Healing as HealingIcon,
  Policy as PolicyIcon,
} from '@material-ui/icons'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import type { MergedTheme } from '@app/theme'
import { PageLoad } from './page-load'

const useStyles = makeStyles(({ breakpoints }: MergedTheme) =>
  createStyles({
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
  })
)

export function RenderSecondary({
  adaScore,
  pageLoadTime = {
    duration: 0,
  },
  issues = [],
  lastScanDate,
  issuesInfo,
  pageHeaders,
}: any) {
  const classes = useStyles()
  const matches = useMediaQuery('(min-width:600px)')
  const possibleIssuesFixedByCdn = issuesInfo?.possibleIssuesFixedByCdn
  const totalIssuesOnPage = issuesInfo?.totalIssues
  const issuesFixedByCdn = issuesInfo?.issuesFixedByCdn
  const lastScan = (lastScanDate && new Date(lastScanDate)) || new Date()

  let allPageIssues = 0

  if (issues?.length) {
    allPageIssues = issues
      .map((item: any) => item?.issues?.length)
      .flat()
      .reduce((a: number, b: number) => Number(a || 0) + Number(b || 0))
  }

  const mainIssues =
    totalIssuesOnPage > allPageIssues ? totalIssuesOnPage : allPageIssues

  return (
    <div className={classes.row}>
      {mainIssues ? (
        <Tooltip
          title={`${mainIssues} issue${
            totalIssuesOnPage === 1 ? '' : 's'
          } across ${issues?.length || 1} page${
            issues?.length === 1 || !issues.length ? '' : 's'
          }`}
          placement={'right'}
        >
          <Chip
            className={classes.adjust}
            variant='outlined'
            size='small'
            avatar={<IssuesIcon />}
            label={`${mainIssues} issue${totalIssuesOnPage === 1 ? '' : 's'}`}
          />
        </Tooltip>
      ) : adaScore === 100 ? (
        <Typography className={classes.issuesText}>Passes tests</Typography>
      ) : null}
      <PageLoad pageLoadTime={pageLoadTime} mobile={!matches} />
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
            className={classes.adjust}
            avatar={<HealingIcon color={'primary'} />}
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
            className={classes.adjust}
            avatar={<CalendarIcon color={'primary'} />}
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

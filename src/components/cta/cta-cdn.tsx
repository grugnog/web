import { Fragment } from 'react'
import { Button, Typography } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Link } from '@app/components/general/link'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tryOut: {
      marginLeft: '3px',
      marginRight: '5px',
    },
    row: {
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
    },
    register: {
      color: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,
    },
    report: {
      color: theme.palette.primary.main,
    },
    text: {
      fontWeight: 'bold',
      marginRight: '12px',
    },
    limited: {
      padding: theme.spacing(1),
      borderRadius: '3px',
      border: `2px solid ${theme.palette.primary.main}`,
      marginTop: theme.spacing(1),
    },
  })
)

function CtaCdn({ website, disablePlayground, authenticated }: any) {
  const classes = useStyles()
  const noIssues =
    Number(website?.issues?.length || website?.issues?.issues?.length) === 0

  const totalIssuesOnPage = website?.issuesInfo?.totalIssues ?? '_'
  const shouldBlock = disablePlayground
  const limitedResonse = website?.issuesInfo?.limitedCount
    ? `This is a limited API response showing ${website.issuesInfo.limitedCount}/${totalIssuesOnPage} issues for the current page, sign in to see the full report across all pages.`
    : !website?.issues && 'Gathering details'
  const moreInfo = shouldBlock
    ? `Get all your pages issues at once and more after signing in`
    : ''

  return (
    <Fragment>
      {moreInfo ? (
        <Typography
          component='span'
          className={classes.tryOut}
          variant={'subtitle2'}
        >
          {moreInfo}
        </Typography>
      ) : null}
      {limitedResonse ? (
        <div className={classes.limited}>
          <Typography variant={'subtitle2'}>{limitedResonse}</Typography>
        </div>
      ) : null}
      {disablePlayground || authenticated ? null : (
        <span className={classes.row} style={{ marginTop: 12 }}>
          <Button
            component={Link}
            href={'/login'}
            color={'secondary'}
            variant={'contained'}
            className={classes.text}
          >
            Login
          </Button>
          <Button
            component={Link}
            href={'/register'}
            color={'secondary'}
            variant={'outlined'}
            className={`${classes.register} ${classes.text}`}
          >
            Register
          </Button>
        </span>
      )}
      {noIssues ? <Typography>No issues found, great job!</Typography> : null}
    </Fragment>
  )
}

export { CtaCdn }

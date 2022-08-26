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
    register: {
      color: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,
    },
    text: {
      fontWeight: 'bold',
      marginRight: '12px',
    },
  })
)

function CtaCdn({ website, disablePlayground, authenticated }: any) {
  const classes = useStyles()

  const noIssues =
    Number(website?.issues?.length || website?.issues?.issues?.length) === 0
  const totalIssuesOnPage = website?.issuesInfo?.totalIssues ?? '_'
  const limitedResonse = website?.issuesInfo?.limitedCount
    ? `This is a limited API response showing ${website.issuesInfo.limitedCount}/${totalIssuesOnPage} issues for the current page, sign in to see the full report across all pages.`
    : !website?.issues && 'Gathering details'
  const moreInfo = disablePlayground
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
      <div className='pt-3 pb-2'>
        <div className={'border-2 rounded border-gray-500 p-2'}>
          <p className='text-base text-grey-700'>
            {limitedResonse || 'Scan Complete'}
          </p>
        </div>
      </div>
      {disablePlayground || authenticated ? null : (
        <div className={'flex align-center pt-3'}>
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
        </div>
      )}
      {noIssues ? <Typography>No issues found, great job!</Typography> : null}
    </Fragment>
  )
}

export { CtaCdn }

import { Fragment } from 'react'
import { Button, Typography } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Link } from '@app/components/general/link'
import { Website } from '@app/types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tryOut: {
      paddingLeft: '3px',
      paddingRight: '5px',
    },
    register: {
      color: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,
    },
    text: {
      fontWeight: 'bold',
    },
  })
)

function CtaCdn({
  website,
  disablePlayground,
  authenticated,
}: {
  website: Website
  disablePlayground: boolean
  authenticated: boolean
}) {
  const classes = useStyles()

  // todo: fix issue returning gql
  const noIssues = !(
    (Array.isArray(website?.issues) && website.issues) ||
    website?.issues?.issues
  )?.length

  const limitedResonse = website?.issuesInfo?.limitedCount
    ? `This is a limited API response showing ${
        website.issuesInfo.limitedCount
      }/${
        website?.issuesInfo?.totalIssues || '_'
      } issues for the current page, sign in to see the full report across all pages.`
    : !website?.issues && 'Gathering details'

  return (
    <Fragment>
      {disablePlayground ? (
        <Typography
          component='span'
          className={classes.tryOut}
          variant={'subtitle2'}
        >
          Get all your pages issues at once and more after signing in
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
        <div className={'flex align-center pt-3 space-x-2'}>
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

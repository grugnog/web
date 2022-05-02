import React, { memo } from 'react'
import { ListItem, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { WithHighlight } from '@app/components/adhoc'
import { getErrorColor } from '@app/lib/base-colors'

const useStyles = makeStyles(() => ({
  mainItemContainer: {
    overflow: 'hidden',
    display: 'block',
  },
  code: {
    overflow: 'hidden',
  },
  mainSubtitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 300,
    fontSize: '1.1em',
  },
  secondSubtitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 400,
    fontSize: '1.35em',
  },
}))

// TODO: remove MAT usage
export function FeedIssueComponent({
  message,
  code,
  context,
  type: issueType = 'notice',
  handleToggle,
  listIndex,
  ...extraProps
}: any) {
  const classes = useStyles()
  const { typeCode, runnerExtras, ...props } = extraProps

  return (
    <ListItem className={classes.mainItemContainer} divider {...props}>
      <div className={classes.mainItemContainer}>
        <div className='flex space-x-2 items-center'>
          <div className={`${getErrorColor(issueType)} w-3 h-3 rounded-xl`} />
          <Typography className={classes.mainSubtitle} component={'p'}>
            {code}
          </Typography>
        </div>
        <Typography gutterBottom className={classes.secondSubtitle}>
          {message}
        </Typography>
        <WithHighlight className={classes.code}>
          {String(context)}
        </WithHighlight>
      </div>
    </ListItem>
  )
}

export const FeedIssue = memo(FeedIssueComponent)

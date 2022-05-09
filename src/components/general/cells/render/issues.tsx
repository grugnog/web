import React, { memo } from 'react'
import { ListItem, ListItemIcon, Typography, Checkbox } from '@material-ui/core'
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
    maxWidth: '69vw',
  },
  mainSubtitle: {
    maxWidth: '88%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 300,
    fontSize: '1.1em',
  },
  secondSubtitle: {
    maxWidth: '88%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 400,
    fontSize: '1.35em',
  },
}))

export function RenderIssueComponent({
  message,
  code,
  context,
  type: issueType = 'notice',
  checkList,
  checked,
  handleToggle,
  listIndex,
  ...extraProps
}: any) {
  const classes = useStyles()
  const labelId = `checkbox-list-label-${listIndex}`
  const checkListProps = Object.assign(
    {},
    checkList
      ? {
          role: undefined,
          dense: true,
          component: 'button',
          onClick: () => handleToggle(listIndex),
        }
      : {},
    extraProps
  )

  const { error, openError, typeCode, runnerExtras, ...props } = checkListProps

  return (
    <ListItem className={`${classes.mainItemContainer}`} divider {...props}>
      {checkList ? (
        <ListItemIcon>
          <Checkbox
            edge='start'
            checked={checked.indexOf(listIndex) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
      ) : null}
      <div className={classes.mainItemContainer}>
        <div className='flex space-x-2 items-center'>
          <div className={`${getErrorColor(issueType)} w-3 h-3 rounded-full`} />
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

export const RenderIssue = memo(RenderIssueComponent)

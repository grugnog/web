import React, { memo } from 'react'
import { ListItem, ListItemIcon, Typography, Checkbox } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
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

  const { error, openError, typeCode, runnerExtras, recurrence,  ...props } = checkListProps

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
          {recurrence ? <div className='px-2 bg-gray-200 rounded'><p className={'truncate text-sm font-bold'}>Recurrence: {recurrence}</p></div> : null}
        </div>
        <Typography gutterBottom className={classes.secondSubtitle}>
          {message}
        </Typography>
        <pre
          className={`${classes.code} overflow-x-auto p-2 block text-white`}
          style={{ tabSize: 4, backgroundColor: 'rgb(43, 43, 43)' }}
        >
          {String(context)}
        </pre>
      </div>
    </ListItem>
  )
}

export const RenderIssue = memo(RenderIssueComponent)

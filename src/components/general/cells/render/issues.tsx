import React, { memo } from 'react'
import { ListItem, ListItemIcon, Typography, Checkbox } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { WithHighlight } from '@app/components/adhoc'

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
  blockColor: {
    color: 'rgb(202,109,102)',
  },
  error: {
    background: 'rgba(239,83,80, 0.06)',
  },
  notice: {
    background: 'rgba(189,189,189, 0.06)',
  },
  warning: {
    background: 'rgba(255,238,88, 0.06)',
  },
}))

export function RenderIssueComponent({
  message,
  code,
  context,
  type = 'notice',
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

  const { error, openError, ...props } = checkListProps

  console.log(extraProps)

  return (
    <ListItem
      // @ts-ignore
      className={`${classes.mainItemContainer} ${classes[type]}`}
      divider
      {...props}
    >
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
        <Typography className={classes.mainSubtitle} component={'p'}>
          {code}
        </Typography>
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

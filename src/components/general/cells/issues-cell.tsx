import React, { useState, memo, useCallback } from 'react'
import {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  MenuItem,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from '../link'
import { TopMenu } from '../top-menu'
import type { IssueCellProps } from './types'
import { GrMoreVertical } from 'react-icons/gr'
import { RenderAvatar } from './render'

const useStyles = makeStyles(() => ({
  title: {
    maxWidth: '50vw',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#000',
    flex: 1,
  },
}))

export function IssuesCellComponent({
  url,
  handleClickOpen,
  handleClickOpenPlayer,
  issues,
  index,
}: IssueCellProps) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenu = useCallback(
    (event: any) => {
      setAnchorEl(event.currentTarget)
    },
    [setAnchorEl]
  )

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [setAnchorEl])

  const handleMainClick = (eventData: any, title: any, mini: boolean) => () => {
    mini
      ? handleClickOpenPlayer(true, eventData, title)()
      : handleClickOpen(eventData, title, url, true)
    setAnchorEl(null)
  }

  const href = `/website-details?url=${encodeURI(url)}`
  const menuId = `issues-appbar${index}`

  // TODO: move to more options
  const authForm = (
    <div>
      <IconButton
        aria-label={`websites ${url || 'url'} more actions`}
        aria-controls={menuId}
        aria-haspopup='true'
        onClick={handleMenu}
        color={'inherit'}
      >
        <GrMoreVertical />
      </IconButton>
      <TopMenu
        id={menuId}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem component={Link} href={href} color={'inherit'}>
          View Sandbox
        </MenuItem>
        {issues?.length ? (
          <MenuItem onClick={handleMainClick(issues, 'Issues', false)}>
            View Issues
          </MenuItem>
        ) : null}
        <MenuItem onClick={handleMainClick(url, 'Mini Player', true)}>
          View Sandbox (Mini Player)
        </MenuItem>
      </TopMenu>
    </div>
  )

  return (
    <ListItem
      button
      component={Link}
      href={href}
      color={'inherit'}
      dense
      divider
    >
      <ListItemAvatar>
        <RenderAvatar />
      </ListItemAvatar>
      <ListItemText
        primary={url}
        className={classes.title}
        secondary={
          issues?.length
            ? `${issues.length} issues found`
            : String.fromCharCode(160)
        }
      />
      <ListItemSecondaryAction>{authForm}</ListItemSecondaryAction>
    </ListItem>
  )
}

export const IssuesCell = memo(IssuesCellComponent)

import React, { useState, memo, useMemo, useCallback } from 'react'
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  MenuItem,
} from '@material-ui/core'
import { NextComposed } from '../link'
import { TopMenu } from '../top-menu'
import type { IssueCellProps } from './types'
import { GrMoreVertical } from 'react-icons/gr'

// TODO: use generic menu
export function IssuesCellComponent({
  url,
  handleClickOpen,
  handleClickOpenPlayer,
  issues,
  index,
}: IssueCellProps) {
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

  const href = useMemo(
    () => `/website-details?url=${encodeURIComponent(url)}`,
    [url]
  )

  const menuId = `issues-appbar${index}`

  return (
    <ListItem
      button
      component={NextComposed as any}
      href={href}
      color={'inherit'}
      dense
      divider
    >
      <ListItemText
        primary={url}
        className={'flex-1 truncate'}
        secondary={`${issues.length} issues found`}
      />
      <ListItemSecondaryAction>
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
            <MenuItem
              component={NextComposed as any}
              href={href}
              color={'inherit'}
            >
              View Sandbox
            </MenuItem>
            <MenuItem onClick={handleMainClick(issues, 'Issues', false)}>
              View Issues
            </MenuItem>
            <MenuItem onClick={handleMainClick(url, 'Mini Player', true)}>
              View Sandbox (Mini Player)
            </MenuItem>
          </TopMenu>
        </div>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export const IssuesCell = memo(IssuesCellComponent)

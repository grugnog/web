/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { Fragment, useState } from 'react'
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core'
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreIcon,
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import { RenderAvatar, RenderSecondary, RenderIssuesList } from './render'

import { Link } from '../link'

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    color: 'inherit',
  },
  listTitle: {
    maxWidth: '50vw',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#fff',
    flex: 1,
    fontSize: '1.1em',
    fontWeight: 600,
  },
  flex: {
    flex: 1,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    paddingLeft: '14px',
    paddingRight: '14px',
    paddingTop: '6px',
    paddingBottom: '6px',
    // @ts-ignore
    borderBottom: `1px solid ${theme.color.border}`,
  },
  list: {
    maxHeight: '50vh',
  },
  smallList: {
    maxHeight: '65vh',
  },
  overScroll: {
    '-webkit-overflow-scrolling': 'touch',
    paddingBottom: '2px',
    paddingTop: 0,
  },
  listContainer: {
    flex: 1,
    display: 'block',
    overflowX: 'hidden',
    padding: 0,
  },
  normalContentColor: {
    color: 'rgb(209,156,102)',
  },
  blockColor: {
    color: 'rgb(202,109,102)',
  },
  noText: {
    textDecoration: 'none',
    ['&:hover']: {
      textDecoration: 'none',
    },
  },
}))

export function WebsitePrimaryCell({
  handleClickOpen,
  item,
  url,
  handleClickOpenPlayer,
  issuesModal = false,
  error = false,
  handleToggle,
  checked,
  checkList,
  listIndex,
  openError,
}: any) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const [issueView, setIssueView] = useState<any>(error)

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const viewIssue = (e: any) => {
    if (e?.preventDefault) {
      e.preventDefault()
    }
    handleMenuClose()
    setIssueView(!issueView)
  }

  const handleMainClick = (
    eventData: any,
    title?: string,
    mini?: boolean
  ) => () => {
    mini
      ? handleClickOpenPlayer(true, eventData, title)()
      : handleClickOpen(eventData, title, url)
    setAnchorEl(null)
  }
  const pageIssues =
    (Array.isArray(item?.issues) ? item.issues : item?.issues?.issues) || []
  const secondaryText = pageIssues?.length
    ? `${pageIssues.length} issue${pageIssues?.length === 1 ? '' : 's'} found!`
    : null
  const mainUrl = item?.url || item?.pageUrl
  const href = `/website-details?websiteUrl=${encodeURIComponent(mainUrl)}`

  const authForm = (
    <div>
      <IconButton
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'
      >
        <MoreIcon />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={!!anchorEl}
        onClose={handleMenuClose}
      >
        <MenuItem component={Link} href={href} color='inherit'>
          View Website
        </MenuItem>
        {pageIssues?.length || error ? (
          <MenuItem onClick={viewIssue}>
            {issueView ? 'Hide' : 'View'} Issues
          </MenuItem>
        ) : null}
        <MenuItem onClick={handleMainClick(mainUrl, 'Mini Player', true)}>
          View Website (Mini Player)
        </MenuItem>
      </Menu>
    </div>
  )

  const issueProps = {
    error,
    checkList,
    handleToggle,
    checked,
    listIndex,
    openError,
    pageIssues,
    item,
  }

  const linkType = openError && !issuesModal

  const extraProps = {
    component: linkType ? Link : 'button',
    href: linkType ? href : undefined,
    color: 'inherit',
    onClick: linkType ? undefined : viewIssue,
    className: classes.noText,
  }

  return (
    <Fragment>
      <ListItem divider {...extraProps}>
        <RenderAvatar {...item} error={error} />
        <div>
          <ListItemText
            primary={mainUrl || item?.selector}
            primaryTypographyProps={{
              className: classes.listTitle,
            }}
          />
          {error ? null : (
            <RenderSecondary
              {...item}
              secondaryText={secondaryText || item?.context}
            />
          )}
        </div>
        {error ? (
          <ListItemSecondaryAction>
            <IconButton
              aria-label='toggle item visibility'
              aria-controls='menu-appbar-item'
              onClick={viewIssue}
              color='inherit'
            >
              {issueView ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
          </ListItemSecondaryAction>
        ) : (
          <ListItemSecondaryAction>{authForm}</ListItemSecondaryAction>
        )}
      </ListItem>
      {issueView ? <RenderIssuesList {...issueProps} /> : null}
    </Fragment>
  )
}

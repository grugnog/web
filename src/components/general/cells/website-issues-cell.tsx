import React, { Fragment, useCallback, useState } from 'react'
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { RenderAvatar, RenderSecondary, RenderIssuesList } from './render'

import { Link } from '../link'
import { GrUp, GrDown } from 'react-icons/gr'
import { MoreOptionsBase } from './menu'

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    color: 'inherit',
  },
  listTitle: {
    maxWidth: '50vw',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#000',
    flex: 1,
    fontSize: '1.1em',
    fontWeight: 600,
  },
  listTitleMax: {
    maxWidth: '60%',
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
    borderBottom: `1px solid ${theme.palette.divider}`,
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

export function WebsiteIssuesCell({
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
  listTitleMax,
}: any) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const [issueView, setIssueView] = useState<boolean>(error)

  const handleMenu = useCallback(
    (event: any) => {
      setAnchorEl(event.currentTarget)
    },
    [setAnchorEl]
  )

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [setAnchorEl])

  const viewIssue = useCallback(
    (e: any) => {
      e?.preventDefault()

      handleClose()
      setIssueView((v) => !v)
    },
    [setIssueView, handleClose]
  )

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

  const mainUrl = item?.pageUrl || item.url

  const href = `/website-details?url=${encodeURIComponent(mainUrl)}`

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
        <div className={'flex flex-1'}>
          <ListItemText
            primary={mainUrl || item?.selector}
            primaryTypographyProps={{
              className: `${classes.listTitle}${
                listTitleMax ? ` ${classes.listTitleMax}` : ''
              }`,
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
              {issueView ? <GrUp /> : <GrDown />}
            </IconButton>
          </ListItemSecondaryAction>
        ) : (
          <ListItemSecondaryAction>
            <MoreOptionsBase
              handleMainClick={handleMainClick}
              anchorEl={anchorEl}
              handleClose={handleClose}
              handleMenu={handleMenu}
              pageUrl={mainUrl}
              {...issueProps}
            />
          </ListItemSecondaryAction>
        )}
      </ListItem>
      {issueView ? <RenderIssuesList {...issueProps} /> : null}
    </Fragment>
  )
}

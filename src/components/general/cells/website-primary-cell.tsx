import { Fragment, useState, memo, useCallback } from 'react'
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import { RenderAvatar, RenderSecondary, RenderIssuesList } from './render'

import { Link } from '../link'
import { GrDown, GrUp } from 'react-icons/gr'
import { MoreOptionsBase } from './menu'
import { Button } from '../buttons'

const useStyles = makeStyles(() => ({
  listTitle: {
    maxWidth: '50vw',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#0E1116',
    flex: 1,
    fontSize: '1.1em',
    fontWeight: 600,
  },
  listTitleMax: {
    maxWidth: '70%',
  },
  noText: {
    textDecoration: 'none',
    ['&:hover']: {
      textDecoration: 'none',
    },
  },
}))

// TODO: refactor component usage for FeedItem rendering.
export function WebsitePrimaryCellComponent({
  handleClickOpen,
  item,
  url,
  handleClickOpenPlayer,
  issuesModal = false,
  error = false,
  handleToggle,
  checkList,
  listIndex,
  openError,
  listTitleMax,
  pagesModal,
}: any) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const [issueView, setIssueView] = useState<any>(error)

  const handleMenu = useCallback(
    (event: any) => {
      setAnchorEl(event.currentTarget)
    },
    [setAnchorEl]
  )

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [setAnchorEl])

  const viewIssue = (e: any) => {
    if (e?.preventDefault) {
      e.preventDefault()
    }
    handleClose()
    setIssueView(!issueView)
  }

  const handleMainClick =
    (eventData: any, title?: string, mini?: boolean) => () => {
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
  const mainUrl = item?.pageUrl || item?.url
  const href = `/website-details?url=${encodeURIComponent(mainUrl)}`

  const lh = item?.insight?.json

  const linkType = openError && !issuesModal

  const extraProps = {
    component: linkType ? Link : 'button',
    href: linkType ? href : undefined,
    color: 'inherit',
    onClick: linkType ? undefined : viewIssue,
    className: classes.noText,
  }

  const secondaryContent = !pagesModal && secondaryText ? secondaryText : ''

  // build the props we want for the component extracting pieces.
  const issueProps = {
    error,
    checkList,
    handleToggle,
    listIndex,
    openError,
    pageIssues, // array of issues
    url,
  }

  return (
    <Fragment>
      <ListItem divider {...extraProps}>
        <RenderAvatar {...item} error={error} />
        <div className='space-y-1'>
          <ListItemText
            primary={mainUrl || item?.selector}
            primaryTypographyProps={{
              className: `${classes.listTitle}${
                listTitleMax ? ` ${classes.listTitleMax}` : ''
              }`,
            }}
          />
          {secondaryContent ? <p>{secondaryContent}</p> : null}
          {error ? null : (
            <RenderSecondary
              {...item}
              secondaryText={secondaryText || item?.context}
            />
          )}
        </div>
        <ListItemSecondaryAction>
          {error ? (
            <Button
              iconButton
              aria-label='toggle item visibility'
              aria-controls='menu-appbar-item'
              onClick={viewIssue}
            >
              {issueView ? <GrUp /> : <GrDown />}
            </Button>
          ) : (
            <MoreOptionsBase
              handleMainClick={handleMainClick}
              anchorEl={anchorEl}
              handleClose={handleClose}
              handleMenu={handleMenu}
              lh={lh}
              pageUrl={mainUrl}
              {...issueProps}
            />
          )}
        </ListItemSecondaryAction>
      </ListItem>
      {issueView ? <RenderIssuesList {...issueProps} /> : null}
    </Fragment>
  )
}

export const WebsitePrimaryCell = memo(WebsitePrimaryCellComponent)

import React, { useMemo, useState } from 'react'
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from '../link'
import { RenderAvatar, RenderSecondary } from './render'
import { ModalType } from '@app/data/enums'
import { MenuForm } from './menu/menu-form'
import type { Website } from '@app/types'

const useStyles = makeStyles(() => ({
  root: {
    ['&:hover']: {
      textDecoration: 'none',
    },
  },
  title: {
    maxWidth: '50vw',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: 1,
    fontSize: '1.1em',
    fontWeight: 500,
  },
}))

interface WebsiteCellProps extends Partial<Website> {
  removePress(props: { variables: { url?: string | null } }): void
  handleClickOpen(a: any, b: any, c?: string): void
  handleClickOpenPlayer: (a: boolean, b: any, c?: string) => () => void
  setModal(data: any): void
  mutatationLoading: boolean
}

export function WebsiteCell(props: WebsiteCellProps) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<any>(null)

  const {
    url,
    removePress,
    handleClickOpen,
    handleClickOpenPlayer,
    issues,
    issuesInfo,
    adaScore,
    cdnConnected,
    setModal,
    html,
    pageLoadTime,
    mutatationLoading,
    lastScanDate,
    pageHeaders,
  } = props ?? {}

  const removeWebsite = () => {
    removePress({
      variables: {
        url,
      },
    })
  }

  const href = useMemo(
    () => (url ? `/website-details?websiteUrl=${encodeURIComponent(url)}` : ''),
    [url]
  )

  const handleMainClick = (
    eventData?: any,
    title?: string,
    mini?: boolean,
    url?: string
  ) => () => {
    mini
      ? handleClickOpenPlayer(true, eventData, title)()
      : handleClickOpen(eventData, title, url)
    setAnchorEl(null)
  }
  const modalClick = () => {
    setModal({ open: true, modalType: ModalType.highlight, html, url })
    setAnchorEl(null)
  }

  return (
    <ListItem
      button
      component={Link}
      href={href}
      color={'inherit'}
      className={classes.root}
    >
      <RenderAvatar
        cdnConnected={cdnConnected}
        adaScore={adaScore}
        error={false}
      />
      <div>
        <ListItemText
          primary={url}
          primaryTypographyProps={{
            className: classes.title,
          }}
        />
        <RenderSecondary
          issuesInfo={issuesInfo}
          cdnConnected={cdnConnected}
          adaScore={adaScore}
          issues={issues}
          pageLoadTime={pageLoadTime}
          mutatationLoading={mutatationLoading}
          lastScanDate={lastScanDate}
          pageHeaders={pageHeaders}
        />
      </div>
      <ListItemSecondaryAction>
        <MenuForm
          modalClick={modalClick}
          handleMainClick={handleMainClick}
          removeWebsite={removeWebsite}
          setAnchorEl={setAnchorEl}
          anchorEl={anchorEl}
          {...props}
        />
      </ListItemSecondaryAction>
    </ListItem>
  )
}

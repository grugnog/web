/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { useState } from 'react'
import {
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  MenuItem,
  Button,
} from '@material-ui/core'
import { logGraphErrors } from '@app/lib/log'
import { MoreVert as MoreIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { AppManager } from '@app/managers'
import { Link } from '../link'
import { RenderAvatar, RenderSecondary } from './render'
import { TopMenu } from '../top-menu'
import { ModalType } from '@app/data/enums'
// import { Text, View, StyleSheet } from 'react-native'
// import { theme } from '@app-theme'

const useStyles = makeStyles(() => ({
  title: {
    maxWidth: '50vw',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: 1,
    fontSize: '1.8rem',
    fontWeight: 300,
  },
}))

// const styles = StyleSheet.create({
//   infoContainer: {
//     padding: theme.spacing(2),
//   },
//   text: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   spacing: {
//     marginTop: theme.spacing(2),
//     width: '100%',
//   },
// })

export function WebsiteCellDashboard({
  url,
  removePress,
  handleClickOpen,
  subDomains,
  handleClickOpenPlayer,
  issues,
  issuesInfo,
  adaScore,
  cdnConnected,
  crawlWebsite,
  setModal,
  html,
  pageLoadTime,
  mutatationLoading,
  lastScanDate,
  pageHeaders,
  index,
}: any) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<any>(null)

  const handleMenu = (event: any) => {
    setAnchorEl(event?.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const removeWebsite = (e: any) => {
    e?.preventDefault()
    removePress(url)
  }

  const href = `/website-details?websiteUrl=${encodeURIComponent(url)}`

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

  const menuId = `menu-appbar${index}`

  const authForm = (
    <div>
      <IconButton
        aria-label='account of current user'
        aria-controls={menuId}
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'
      >
        <MoreIcon />
      </IconButton>
      <TopMenu
        id={menuId}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem component={Link} href={href} color='inherit'>
          View Website
        </MenuItem>
        {issues?.length ? (
          <MenuItem onClick={handleMainClick(issues, 'Issues', false, url)}>
            View Issues
          </MenuItem>
        ) : null}
        {subDomains?.length ? (
          <MenuItem
            onClick={handleMainClick(subDomains, 'All Pages', false, url)}
          >
            View Pages
          </MenuItem>
        ) : null}
        <MenuItem onClick={handleMainClick(url, '', true)}>
          View Website (Mini Player)
        </MenuItem>
        {typeof setModal !== 'undefined' && html ? (
          <MenuItem onClick={modalClick}>View Source</MenuItem>
        ) : null}
        <MenuItem
          onClick={handleMainClick(pageHeaders, 'Custom Headers', false, url)}
        >
          Update Headers
        </MenuItem>
        {typeof crawlWebsite !== 'undefined' ? (
          <MenuItem
            onClick={async () => {
              await crawlWebsite({
                variables: {
                  url,
                },
              }).catch(logGraphErrors)
              handleClose()
              AppManager.toggleSnack(
                true,
                'Scan in progress, if new issues occur you will be alerted',
                'success'
              )
            }}
          >
            Scan
          </MenuItem>
        ) : null}
        {removePress ? (
          <MenuItem onClick={removeWebsite} style={{ color: 'red' }}>
            Delete
          </MenuItem>
        ) : null}
      </TopMenu>
    </div>
  )

  return (
    <div className={`${classes.root} w-full`}>
      <div className={'flex place-items-center w-full'}>
        <RenderAvatar
          cdnConnected={cdnConnected}
          adaScore={adaScore}
          error={false}
        />
        <div className={'w-full'}>
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
          <div className={'flex flex-col w-full place-items-center py-2 my-2'}>
            <Button
              button
              component={Link}
              href={href}
              color={'inherit'}
              className={'w-40'}
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
      {/* <View style={styles.spacing} />
        <View style={styles.infoContainer}>
          <Text style={styles.text}>
            CDN Connected {cdnConnected ? 'Yes' : 'No'}
          </Text>
        </View> */}
      <ListItemSecondaryAction>{authForm}</ListItemSecondaryAction>
    </div>
  )
}

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { Fragment, memo } from 'react'
import { IconButton, MenuItem } from '@material-ui/core'
import { logGraphErrors } from '@app/lib/log'
import { MoreVert as MoreIcon } from '@material-ui/icons'
import { AppManager } from '@app/managers'
import { Link } from '../../link'
import { TopMenu } from '../../top-menu'

export function MoreOptionsComponent({
  url,
  removePress,
  removeWebsite,
  subDomains,
  issues,
  crawlWebsite,
  setModal,
  html,
  pageHeaders,
  index,
  anchorEl,
  handleMenu,
  handleMainClick,
  handleClose,
  modalClick,
}: any) {
  const href = `/website-details?websiteUrl=${encodeURIComponent(url)}`
  const menuId = `menu-appbar${index}`

  return (
    <Fragment>
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
        <MenuItem onClick={handleMainClick(url, 'Mini Player', true)}>
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
              AppManager.toggleSnack(
                true,
                'Scan in progress, if new issues occur you will be alerted',
                'success'
              )
              await crawlWebsite({
                variables: {
                  url,
                },
              }).catch(logGraphErrors)
              handleClose()
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
    </Fragment>
  )
}

export const MoreOptions = memo(MoreOptionsComponent)

import React from 'react'
import { IconButton, MenuItem } from '@material-ui/core'
import { logGraphErrors } from '@app/lib/log'
import { MoreVert as MoreIcon } from '@material-ui/icons'
import { AppManager } from '@app/managers'
import { Link } from '../../link'
import { TopMenu } from '../../top-menu'

export function MenuForm({
  url,
  removePress,
  subDomains,
  issues,
  history,
  crawlWebsite,
  setModal,
  html,
  pageHeaders,
  index,
  // top props
  handleMainClick,
  removeWebsite,
  modalClick,
  // TODO: use STATE to manage
  setAnchorEl,
  anchorEl,
}: any) {
  const handleMenu = (event: any) => {
    setAnchorEl(event?.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const href = `/website-details?websiteUrl=${encodeURIComponent(url)}`
  const menuId = `menu-appbar${index}`

  return (
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
        <MenuItem onClick={handleMainClick(url, 'Mini Player', true)}>
          View Website (Mini Player)
        </MenuItem>
        {typeof setModal !== 'undefined' && html ? (
          <MenuItem onClick={modalClick}>View Source</MenuItem>
        ) : null}
        {!history ? (
          <MenuItem
            onClick={handleMainClick(pageHeaders, 'Custom Headers', false, url)}
          >
            Update Headers
          </MenuItem>
        ) : null}
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
        {removePress && !history ? (
          <MenuItem onClick={removeWebsite} style={{ color: 'red' }}>
            Delete
          </MenuItem>
        ) : null}
      </TopMenu>
    </div>
  )
}

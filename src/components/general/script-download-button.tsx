import React, { useState } from 'react'
import { Menu, MenuItem, IconButton } from '@material-ui/core'
import { MoreVert as MoreIcon } from '@material-ui/icons'
import { REST_API } from '@app/configs/app-config'

const convertDownloadPath = (cdn: string) => {
  if (REST_API.indexOf('localhost') != -1) {
    return cdn
      ?.replace('/cdn/cdn/', '/cdn/download/')
      .replace('scripts/', 'download/')
  }

  return cdn
}

export function ScriptDownloadButton({ cdn_url, cdn_url_min }: any) {
  const [menuOpen, toggleMenu] = useState<any>(null)

  const handleMenu = (event: any) => {
    toggleMenu(event.currentTarget)
  }

  const handleClose = () => {
    toggleMenu(null)
  }

  return (
    <div>
      <IconButton
        aria-label='download script options for custom cdn fix'
        aria-controls='script-appbar'
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'
      >
        <MoreIcon />
      </IconButton>
      <Menu
        id='script-appbar'
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={menuOpen}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={!!menuOpen}
        onClose={handleClose}
      >
        <MenuItem
          href={convertDownloadPath(cdn_url)}
          component={'a'}
          onClick={handleClose}
        >
          Download
        </MenuItem>
        <MenuItem
          href={convertDownloadPath(cdn_url_min)}
          component={'a'}
          onClick={handleClose}
        >
          Download Minified
        </MenuItem>
      </Menu>
    </div>
  )
}

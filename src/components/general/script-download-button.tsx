import React, { useState } from 'react'
import { Menu, MenuItem, IconButton } from '@material-ui/core'
import { MoreVert as MoreIcon } from '@material-ui/icons'

const download = (path: string, filename: string) => {
  const anchor = document.createElement('a')
  anchor.href = path
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
}

export function ScriptDownloadButton({ cdn_url, cdn_url_min }: any) {
  const [menuOpen, toggleMenu] = useState<any>(null)

  const handleMenu = (event: any) => {
    toggleMenu(event.currentTarget)
  }

  const handleClose = () => {
    toggleMenu(null)
  }

  const downloadFile = (file: string) => {
    fetch(file)
      .then((res) => res.text())
      .then((data) => {
        const blob = new Blob([data], { type: 'application/javascript' })
        const url = URL.createObjectURL(blob)
        const urlTarget = new URL(file)

        download(url, urlTarget.pathname.substring(1))

        URL.revokeObjectURL(url)
      })
      .catch((err) => console.error(err))
    handleClose()
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
        <MenuItem onClick={() => downloadFile(cdn_url)}>Download</MenuItem>
        <MenuItem onClick={() => downloadFile(cdn_url_min)}>
          Download Minified
        </MenuItem>
      </Menu>
    </div>
  )
}

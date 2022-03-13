import React, { useState, useMemo } from 'react'
import { Menu, MenuItem, IconButton } from '@material-ui/core'
import { MoreVert as MoreIcon } from '@material-ui/icons'
import { isA11yWatch } from '@app/configs/app-config'

export function ScriptDownloadButton({ cdn_url, cdn_url_min }: any) {
  const [menuOpen, toggleMenu] = useState<any>(null)

  const handleMenu = (event: any) => {
    toggleMenu(event.currentTarget)
  }

  const handleClose = () => {
    toggleMenu(null)
  }

  const [downLoadCdnLink, downLoadCdnMinLink] = useMemo(() => {
    let mainjs = cdn_url.replace(
      'http://localhost:8090/cdn',
      'http://localhost:8080/scripts'
    )
    let minjs = cdn_url_min.replace(
      'http://localhost:8090/cdn',
      'http://localhost:8080/scripts'
    )
    // remove .cdn with .api since only exposed endpoint
    if (isA11yWatch) {
      mainjs = mainjs.replace('cdn', 'api')
      minjs = minjs.replace('cdn', 'api')
    }

    return [mainjs, minjs]
  }, [cdn_url, cdn_url_min])

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
          href={downLoadCdnLink}
          download
          component={'a'}
          onClick={handleClose}
        >
          Download
        </MenuItem>
        <MenuItem
          href={downLoadCdnMinLink}
          download
          component={'a'}
          onClick={handleClose}
        >
          Download Minified
        </MenuItem>
      </Menu>
    </div>
  )
}

import React, { useState, useMemo, useCallback } from 'react'
import { Menu, MenuItem, IconButton } from '@material-ui/core'
import { isA11yWatch } from '@app/configs/app-config'
import { GrMoreVertical } from 'react-icons/gr'

export function ScriptDownloadButton({ cdn_url, cdn_url_min }: any) {
  const [menuOpen, toggleMenu] = useState<any>(null)

  const handleMenu = useCallback(
    (event: any) => {
      toggleMenu(event.currentTarget)
    },
    [toggleMenu]
  )

  const handleClose = useCallback(() => {
    toggleMenu(null)
  }, [toggleMenu])

  const [downLoadCdnLink, downLoadCdnMinLink] = useMemo(() => {
    let mainjs = cdn_url?.replace('/cdn/', '/scripts/')
    let minjs = cdn_url_min?.replace('/cdn/', '/scripts/')
    // remove .cdn with .api since only exposed endpoint
    if (isA11yWatch) {
      mainjs = mainjs?.replace('cdn', 'api')
      minjs = minjs?.replace('cdn', 'api')
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
        <GrMoreVertical />
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

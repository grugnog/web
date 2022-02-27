import React from 'react'
import { Menu } from '@material-ui/core'

export function TopMenu({
  children,
  anchorEl,
  id,
  ...props
}: {
  children: any
  anchorEl?: any
  id?: string
  open: boolean
  onClose?: any
}) {
  const originProp: any = {
    vertical: 'top',
    horizontal: 'right',
  }
  return (
    <Menu
      id={id}
      anchorEl={anchorEl}
      anchorOrigin={originProp}
      transformOrigin={originProp}
      keepMounted
      {...props}
    >
      {children}
    </Menu>
  )
}

import React, { memo } from 'react'
import { Menu, PopoverOrigin, Fade } from '@material-ui/core'

const originProp: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'right',
}

export function TopMenuComponent({
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
  return (
    <Menu
      id={id}
      TransitionComponent={Fade}
      anchorEl={anchorEl}
      anchorOrigin={originProp}
      transformOrigin={originProp}
      {...props}
    >
      {children}
    </Menu>
  )
}

export const TopMenu = memo(TopMenuComponent)

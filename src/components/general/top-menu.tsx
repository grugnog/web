import React, { memo } from 'react'
import { MenuList } from './menu'

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
    <MenuList {...props} more>
      {children}
    </MenuList>
  )
}

export const TopMenu = memo(TopMenuComponent)

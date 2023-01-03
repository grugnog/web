import React, { memo } from 'react'
import { MenuList } from './menu'

export function TopMenuComponent({
  children,
  id,
  ...props
}: {
  children: any
  id?: string
  onClose?: any
}) {
  return (
    <MenuList {...props} more>
      {children}
    </MenuList>
  )
}

export const TopMenu = memo(TopMenuComponent)

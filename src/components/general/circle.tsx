import React from 'react'
import { Shape } from '@a11ywatch/ui'

export function Circle({
  className,
  children,
}: {
  className: string
  children?: any
}) {
  return (
    <Shape className={className} type={'circle'}>
      {children}
    </Shape>
  )
}

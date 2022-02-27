import React from 'react'
import type { SectionProps } from './section-types'

export function Section({
  alignRight,
  children,
  className,
  textAlign = 'left',
}: SectionProps) {
  let margin = 'marginRight'

  if (alignRight) {
    margin = 'marginLeft'
    textAlign = 'right'
  }

  return (
    <div style={{ textAlign, [margin]: 12 }} className={className}>
      {children}
    </div>
  )
}

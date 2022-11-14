import React from 'react'
import type { SectionProps } from './section-types'

export function Section({ alignRight, children, className }: SectionProps) {
  return (
    <div
      className={`px-2 place-content-between flex flex-col ${
        className ? className : ''
      } ${alignRight ? 'text-right' : ''}`}
    >
      {children}
    </div>
  )
}

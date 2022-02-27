import React from 'react'
import { ribbon, wrap } from '@app/stylesheets/ribbon.module.css'

export function Ribbon({
  title = 'BEST OFFER',
  backgroundColor,
  color,
}: {
  title?: string
  backgroundColor?: string
  color?: string
}) {
  return (
    <div className={wrap}>
      <span className={ribbon} style={{ backgroundColor, color }}>
        {title}
      </span>
    </div>
  )
}

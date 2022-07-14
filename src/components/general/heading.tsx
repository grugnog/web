import React from 'react'
import { Typography } from '@material-ui/core'

export function Heading({
  children,
  variant = 'h5',
  component = 'h3',
  bold = true,
  gutterBottom = true,
}: {
  children: any
  variant?: any
  component?: any
  bold?: boolean
  gutterBottom?: boolean
}) {
  return (
    <Typography
      variant={variant}
      component={component}
      gutterBottom={gutterBottom}
      style={{ fontWeight: bold ? 600 : 400 }}
    >
      {children}
    </Typography>
  )
}

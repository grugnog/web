import React from 'react'
import { Typography } from '@material-ui/core'

interface Props {
  children: any
  gutterBottom?: boolean
  style?: React.CSSProperties
}

export const SectionHeading = ({
  children,
  gutterBottom = false,
  style,
}: Props) => (
  <Typography
    variant='h4'
    component='h3'
    style={{ fontWeight: 'bold', ...style }}
    gutterBottom={gutterBottom}
  >
    {children}
  </Typography>
)

import React from 'react'
import { Skeleton } from '@material-ui/lab'

interface Props {
  height?: any
  width?: any
  style?: any
  className?: string
}

export function TextSkeleton({
  height = '9.5',
  width = '18%',
  style,
  className,
}: Props) {
  return (
    <Skeleton
      className={className}
      height={height}
      width={width}
      style={style}
    />
  )
}

import React from 'react'

export type SkeletonProps = {
  className?: string
  style?: React.CSSProperties
}

// stock skeleton
export const Skeleton = ({ style, className }: SkeletonProps) => {
  return (
    <span
      style={{ ...style, backgroundColor: '#ccc', display: 'block' }}
      className={className}
    ></span>
  )
}

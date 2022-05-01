import React from 'react'
import { Typography } from '@material-ui/core'
import { TextSkeleton } from '@app/components/placeholders'

export const ProfileCell = ({
  skeletonLoad,
  title,
  subTitle,
  className,
}: {
  skeletonLoad?: boolean
  title: string
  subTitle: string
  className?: string
}) => {
  return (
    <>
      <Typography variant='subtitle1' component='p'>
        {title}
      </Typography>
      {skeletonLoad ? (
        <TextSkeleton className={className} />
      ) : (
        <Typography variant='subtitle2' component='p' className={className}>
          {subTitle}
        </Typography>
      )}
    </>
  )
}

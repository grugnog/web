/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { Fragment } from 'react'
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
    <Fragment>
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
    </Fragment>
  )
}

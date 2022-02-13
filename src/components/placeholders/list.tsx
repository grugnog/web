/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { memo } from 'react'
import { ListItemSkeleton, ListItemIssuesSkeleton } from './list-item'

export function ListSkeletonComponent({
  count = 3,
  subTitle = true,
  smallCircle = false,
  avatar = true,
  report = false,
}: any): any {
  const Skeleton = report ? ListItemIssuesSkeleton : ListItemSkeleton

  return Array.from(Array(count).keys()).map((item: string | number) => (
    <Skeleton
      key={item}
      subTitle={subTitle}
      smallCircle={smallCircle}
      avatar={avatar}
    />
  ))
}
export const ListSkeleton = memo(ListSkeletonComponent)

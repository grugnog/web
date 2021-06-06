/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { Fragment } from 'react'
import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { Spacer } from '../general/spacer'

export function ListItemSkeleton({
  subTitle,
  smallCircle,
  avatar = true,
}: any) {
  return (
    <ListItem style={{ height: subTitle ? 72 : 49 }}>
      {avatar ? (
        <ListItemAvatar>
          <Skeleton
            variant='circle'
            width={smallCircle ? 20 : 40}
            height={smallCircle ? 20 : 40}
          />
        </ListItemAvatar>
      ) : null}
      <ListItemText
        disableTypography
        primary={<Skeleton height={9.5} width='30%' />}
        secondary={
          !subTitle ? (
            <div />
          ) : (
            <Fragment>
              <Skeleton height={9} width='20%' style={{ marginTop: 6 }} />
              {!avatar ? (
                <Skeleton height={9} width='20%' style={{ marginTop: 6 }} />
              ) : null}
            </Fragment>
          )
        }
      />
    </ListItem>
  )
}

export function ListItemIssuesSkeleton({ subTitle }: any) {
  return (
    <ListItem style={{ height: subTitle ? 109 : 72 }}>
      <ListItemText
        disableTypography
        primary={<Skeleton height={20} width='35%' />}
        secondary={
          !subTitle ? (
            <div />
          ) : (
            <Fragment>
              <Spacer height={3} />
              <Skeleton height={26} width='75%' />
              <Spacer height={4} />
              <Fragment>
                <Skeleton height={29} width='100%' />
              </Fragment>
            </Fragment>
          )
        }
      />
    </ListItem>
  )
}

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { Fragment } from 'react'
import { Typography, Tooltip } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { defaultProps } from './defaultProps'
import type { BadgeProps } from './badge-types'
import Image from 'next/image'

const useStyles = makeStyles(({ breakpoints }: Theme) =>
  createStyles({
    text: {
      [breakpoints.up('sm')]: {
        fontSize: '1.28rem',
      },
      [breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  })
)

export const Badge = ({
  style,
  inline,
  size: badgeSize,
  src,
  href,
  label,
  title,
}: BadgeProps) => {
  const size = badgeSize === 'small' ? 22 : 32
  const classes = useStyles()

  const Anchor = ({
    children,
    style: aStyle,
    className,
  }: {
    style: any
    children: any
    className?: string
  }) => {
    return (
      <a
        href={href}
        style={aStyle}
        className={className}
        target={'_blank'}
        aria-label={label}
        rel='noreferrer'
      >
        {children}
      </a>
    )
  }

  const Img = () => (
    <Image src={src} height={size} width={size} alt={`${title} logo`} />
  )

  if (inline) {
    return (
      <Anchor style={style} className={'gap-x-2 flex items-center'}>
        <Fragment>
          <Img />
          <Typography className={classes.text}>{title}</Typography>
        </Fragment>
      </Anchor>
    )
  }

  return (
    <Tooltip title={String(label)}>
      <Anchor style={style}>
        <Img />
      </Anchor>
    </Tooltip>
  )
}

Badge.defaultProps = defaultProps

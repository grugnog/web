/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { TranslateBadge as Translate } from 'react-google-translate-lazy'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  badge: {
    marginRight: 6,
    marginLeft: 6,
    background: 'none',
    pointerEvents: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginRight: 12,
    },
  },
  hidden: {
    border: 0,
    clip: 'rect(1px 1px 1px 1px)',
    clipPath: 'inset(50%)',
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    width: 1,
    height: 1,
  },
}))

export const TranslateBadge = ({
  inline,
  className,
}: {
  className?: string
  inline?: boolean
}) => {
  const classes = useStyles()
  const ariaT = 'Translate page using google'

  return (
    <Translate
      aria-label={ariaT}
      className={`${className ?? ''}${className ? ' ' + classes.badge : ''}`}
      inline={inline}
      component={IconButton}
    />
  )
}

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
    fill: '#959da5',
    [theme.breakpoints.down('sm')]: {
      marginRight: 12,
    },
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
      inline={inline}
      className={className}
      classes={{ badge: classes.badge }}
      component={IconButton}
    />
  )
}

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { useState } from 'react'
import { Typography, Button } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Extension, Close, NewReleases } from '@material-ui/icons'
import { Link } from '../general'

type Platform = 'desktop' | 'mobile' | 'crossplatform'

const useStyles = makeStyles(({ breakpoints, palette, spacing }: Theme) =>
  createStyles({
    sticky: {
      background: palette.secondary.main,
      alignItems: 'center',
      display: 'flex',
      padding: spacing(1),
      [breakpoints.down('sm')]: {
        paddingRight: spacing(11),
        display: ({ platform }: { platform?: Platform }) => {
          return platform == 'desktop' ? 'none' : undefined
        },
      },
      position: 'fixed',
      zIndex: 1,
      bottom: 0,
      left: 0,
      right: 0,
    },
    text: {
      paddingLeft: spacing(1),
      paddingRight: spacing(1),
    },
    btn: {
      minWidth: 'auto',
      [breakpoints.down('sm')]: {
        fontSize: 12,
      },
    },
    close: {
      border: 0,
      outline: 0,
    },
  })
)

export type WhatsNewProps = {
  href?: string
  onPrimaryEvent?(): any
  label?: string
  message?: string
  canToggle?: boolean
  platform?: Platform
}

function WhatsNew({
  href,
  label,
  message,
  platform = 'desktop',
  canToggle = true,
}: WhatsNewProps) {
  const classes = useStyles({ platform })
  const [visable, toggleVisible] = useState<boolean>(true)

  if (!message || !visable) {
    return null
  }

  const toggle = () => toggleVisible(!visable)

  return (
    <div className={classes.sticky}>
      {canToggle ? (
        <Button
          onClick={toggle}
          className={classes.close}
          aria-label={'Close whats new section'}
        >
          <Close />
        </Button>
      ) : null}
      <Typography variant={'body2'} className={classes.text}>
        {message}
      </Typography>
      {label && href ? (
        <Button
          href={href}
          component={Link}
          target={'_blank'}
          className={classes.btn}
          rel='noopener'
          aria-label={'Go to chrome extension store for A11yWatch'}
          endIcon={
            label.includes('Chrome Store') ? <Extension /> : <NewReleases />
          }
        >
          {label}
        </Button>
      ) : null}
    </div>
  )
}

export { WhatsNew }

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles(({ breakpoints }: Theme) =>
  createStyles({
    card: {
      minWidth: '275px',
      position: 'relative',
      width: '100%',
      height: '100%',
      maxWidth: '50vw',
      maxHeight: '50vh',
      [breakpoints.down('sm')]: {
        maxWidth: '70vw',
        maxHeight: '70vh',
      },
    },
    title: {
      fontSize: '14px',
    },
    learn: {
      background: 'transparent',
      boxShadow: 'none',
    },
    see: {
      background: 'none',
      boxShadow: 'none',
      color: '#000',
      textTransform: 'none',
    },
    normal: {
      textTransform: 'none',
      minWidth: '150px',
      color: '#000',
      ['&:hover']: {
        textDecoration: 'none',
      },
      [breakpoints.down('sm')]: {
        minWidth: 80,
      },
    },
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '12px',
      marginBottom: '12px',
    },
    ringAnimate: {
      '-webkit-animation': 'ring 7.5s linear 1',
      '-webkit-transform-origin': '50% 4px',
      '-moz-animation': 'ring 7.5s linear 1',
      '-moz-transform-origin': '50% 4px',
      animation: 'ring 7.5s linear 1',
      'transform-origin': '50% 4px',
    },
    about: {
      [breakpoints.down('sm')]: {
        fontSize: '12px',
      },
    },
  })
)

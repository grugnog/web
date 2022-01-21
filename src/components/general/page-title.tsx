/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    fontSize: '3.4rem',
    fontWeight: 800,
    textOverflow: 'ellipsis',
    [theme.breakpoints.down('md')]: {
      fontSize: '2.6rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.21rem',
      maxWidth: '95vw',
    },
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBlock: {
    overflow: 'hidden',
    marginBottom: 15,
  },
}))

function PageTitle({
  title = '',
  rightButton = false,
  children,
  component = 'h1',
  className = '',
}: any) {
  const classes = useStyles()
  const renderTitle = title || children

  if (!renderTitle) {
    return null
  }

  if (rightButton) {
    return (
      <div
        className={`${className ? `${className} ` : ''}${classes.row} ${
          classes.topBlock
        } flex-wrap`}
      >
        <Typography
          variant='h4'
          component={component}
          className={classes.title}
        >
          {renderTitle}
        </Typography>
        {rightButton}
      </div>
    )
  }
  return (
    <Typography
      variant='h4'
      component={component}
      className={`${className ? `${className} ` : ''}${classes.title} ${
        classes.topBlock
      }`}
    >
      {renderTitle}
    </Typography>
  )
}

export { PageTitle }

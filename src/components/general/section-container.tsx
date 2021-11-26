/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: '12%',
    paddingBottom: '12%',
    overflow: 'visible',
  },
}))

const SectionContainer: FC<{ className?: string; id?: string }> = ({
  children,
  className,
  ...props
}) => {
  const classes = useStyles()

  return (
    <section className={[className, classes.root, 'px-6'].join(' ')} {...props}>
      {children}
    </section>
  )
}

export { SectionContainer }

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { FC } from 'react'
import { Button } from '@material-ui/core'
import { Link } from './link'

interface Props {
  href?: string
  name?: string
  className?: string
  as?: string
  route?: string
  registerClassName?: string
  loginClassName?: string
}

export const NavItem: FC<Props> = ({
  href,
  name,
  className,
  as,
  route,
  registerClassName = '',
  loginClassName = '',
}) => {
  const home = `/${href}` === route
  return (
    <Button
      href={home ? '/' : href}
      as={as}
      component={Link}
      variant={name === 'Register' ? 'outlined' : 'text'}
      className={`${className} ${registerClassName} ${loginClassName}`}
    >
      {home ? 'Home' : name}
    </Button>
  )
}

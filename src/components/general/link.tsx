/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { forwardRef } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import MuiLink from '@material-ui/core/Link'

interface NextComposedProps {
  as?: string
  href: string
  prefetch: boolean
}

const NextComposed = forwardRef(function Link(
  { as, href, prefetch = false, ...other }: NextComposedProps,
  ref: React.Ref<HTMLAnchorElement>
) {
  return (
    <NextLink href={href} as={as} passHref prefetch={prefetch}>
      <a
        ref={ref}
        hrefLang={
          href?.includes('https://docs.a11ywatch.com') ? 'en' : undefined
        }
        {...other}
      />
    </NextLink>
  )
})

function MNLink({
  activeClassName = 'active',
  innerRef,
  className,
  naked,
  as: asValue,
  href,
  ...props
}: any) {
  const router = useRouter()
  const external = String(href).includes('http')
  const component = external ? 'a' : NextComposed
  const as = external ? undefined : href

  if (naked) {
    return (
      <NextComposed
        {...props}
        className={`${className} ${
          router?.pathname === href ? activeClassName : ''
        }`}
        as={as}
        href={href}
        ref={innerRef}
      />
    )
  }

  return (
    <MuiLink
      {...props}
      component={component}
      className={className}
      ref={innerRef}
      as={as}
      href={href}
    />
  )
}

const Link = forwardRef(function Link(props: any, ref: any) {
  return <MNLink {...props} innerRef={ref} />
})

export { Link }

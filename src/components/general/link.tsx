import React, { forwardRef } from 'react'
import NextLink from 'next/link'
import MuiLink from '@material-ui/core/Link'

interface NextComposedProps {
  as?: string
  href: string
  prefetch: boolean
}

const NextComposed = forwardRef(function Link(
  { as, href, ...other }: NextComposedProps,
  ref: React.Ref<HTMLAnchorElement>
) {
  return (
    <NextLink href={href} as={as} passHref prefetch={false}>
      <a ref={ref} {...other} />
    </NextLink>
  )
})

const NextComposedPreFetch = forwardRef(function Link(
  { as, href, ...other }: NextComposedProps,
  ref: React.Ref<HTMLAnchorElement>
) {
  return (
    <NextLink href={href} as={as} passHref>
      <a ref={ref} {...other} />
    </NextLink>
  )
})
function MNLink({
  activeClassName = 'active',
  innerRef,
  className,
  as: asValue,
  href,
  shouldPrefetch,
  ...props
}: any) {
  const external = String(href).includes('http')
  const as = external ? undefined : href
  let component = external ? 'a' : NextComposed

  if (shouldPrefetch) {
    component = NextComposedPreFetch
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

export const Link = forwardRef(function Link(props: any, ref: any) {
  return <MNLink {...props} innerRef={ref} />
})

export const LinkPrefetch = forwardRef(function Link(props: any, ref: any) {
  return <MNLink {...props} innerRef={ref} shouldPrefetch />
})

import React, { forwardRef } from 'react'
import NextLink from 'next/link'

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
  let Component = external ? 'a' : NextComposed

  if (shouldPrefetch) {
    Component = NextComposedPreFetch
  }

  return (
    <Component
      {...props}
      className={`text-lg hover:underline ${className}`}
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

import React, { forwardRef } from 'react'
import NextLink from 'next/link'

interface NextComposedProps {
  as?: string
  href: string
  prefetch: boolean
}

export const NextComposed = forwardRef(function Link(
  { as, href, ...other }: NextComposedProps,
  ref?: React.Ref<HTMLAnchorElement>
) {
  return (
    <NextLink
      {...other}
      href={href}
      as={as}
      passHref
      prefetch={false}
      ref={ref}
    ></NextLink>
  )
})

const NextComposedPreFetch = forwardRef(function Link(
  { as, href, ...other }: NextComposedProps,
  ref: React.Ref<HTMLAnchorElement>
) {
  return <NextLink href={href} as={as} passHref ref={ref} {...other}></NextLink>
})

export function MNLink({
  activeClassName = 'active',
  innerRef,
  className,
  as: asValue,
  href,
  shouldPrefetch,
  ...props
}: any) {
  // remove material props that are passed
  const { variant, color, ...extra } = props

  const cname = `text-base hover:underline${className ? ` ${className}` : ''}`

  if (/http|https/.test(href)) {
    return <a {...extra} className={cname} href={href} />
  }

  if (shouldPrefetch) {
    return (
      <NextComposedPreFetch
        {...extra}
        className={cname}
        ref={innerRef}
        as={href}
        href={href}
      />
    )
  }

  return (
    <NextComposed
      {...extra}
      className={cname}
      ref={innerRef}
      as={href}
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

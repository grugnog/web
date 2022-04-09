import React, { forwardRef, StrictMode } from 'react'
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
  if (/http|https/.test(href)) {
    return (
      <a
        {...props}
        className={`text-lg hover:underline ${className}`}
        href={href}
      />
    )
  }

  if (shouldPrefetch) {
    return (
      <NextComposedPreFetch
        {...props}
        className={`text-lg hover:underline ${className}`}
        ref={innerRef}
        as={href}
        href={href}
      />
    )
  }

  return (
    <NextComposed
      {...props}
      className={`text-lg hover:underline ${className}`}
      ref={innerRef}
      as={href}
      href={href}
    />
  )
}

export const Link = forwardRef(function Link(props: any, ref: any) {
  return (
    <StrictMode>
      <MNLink {...props} innerRef={ref} />
    </StrictMode>
  )
})

export const LinkPrefetch = forwardRef(function Link(props: any, ref: any) {
  return <MNLink {...props} innerRef={ref} shouldPrefetch />
})

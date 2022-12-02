import { Fragment } from 'react'
import { Tooltip } from '@material-ui/core'
import { defaultProps } from './defaultProps'
import type { BadgeProps } from './badge-types'
import Image from 'next/image'

const Anchor = ({
  children,
  style: aStyle,
  className,
  href,
  label,
}: {
  href?: string
  label?: string
  style: any
  children: any
  className?: string
}) => {
  return (
    <a
      href={href}
      style={aStyle}
      className={className}
      target={'_blank'}
      aria-label={label}
      rel='noreferrer'
    >
      {children}
    </a>
  )
}

export const Badge = ({
  style,
  inline,
  size: badgeSize,
  src,
  href,
  label,
  title,
}: BadgeProps) => {
  const size = badgeSize === 'small' ? 22 : 32

  if (inline) {
    return (
      <Anchor
        style={style}
        className={'gap-x-2 flex items-center'}
        href={href}
        label={label}
      >
        <Fragment>
          <Image src={src} height={size} width={size} alt={`${title} logo`} />
          <p className={'hidden md:block text-sm'}>{title}</p>
        </Fragment>
      </Anchor>
    )
  }

  return (
    <Tooltip title={String(label)}>
      <Anchor style={style} href={href} label={label}>
        <Image src={src} height={size} width={size} alt={`${title} logo`} />
      </Anchor>
    </Tooltip>
  )
}

Badge.defaultProps = defaultProps

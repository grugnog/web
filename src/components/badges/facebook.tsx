import React from 'react'
import { strings } from '@app-strings'
import { Badge } from './badge'
import { defaultProps } from './defaultProps'
import type { BadgeProps } from './badge-types'

export const FacebookBadge = (props: BadgeProps) => <Badge {...props} />

FacebookBadge.defaultProps = Object.assign({}, defaultProps, {
  title: 'Facebook',
  label: `${strings.appName} on Facebook`,
  src: `/img/facebook.svg`,
  href: 'https://www.facebook.com/A11ywatch-114828426730553',
})

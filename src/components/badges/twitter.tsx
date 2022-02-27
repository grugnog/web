import React from 'react'
import { strings } from '@app-strings'
import { defaultProps } from './defaultProps'
import type { BadgeProps } from './badge-types'
import { Badge } from './badge'

export const TwitterBadge = (props: BadgeProps) => <Badge {...props} />

TwitterBadge.defaultProps = {
  ...defaultProps,
  title: 'Twitter',
  label: `${strings.appName} on Twitter`,
  src: `/img/twitter.svg`,
  href: 'https://twitter.com/A11yWatcher',
}

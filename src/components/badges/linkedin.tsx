import React from 'react'
import { strings } from '@app-strings'
import { Badge } from './badge'
import { defaultProps } from './defaultProps'
import type { BadgeProps } from './badge-types'

export const LinkedinBadge = (props: BadgeProps) => <Badge {...props} />

LinkedinBadge.defaultProps = Object.assign({}, defaultProps, {
  title: 'Linkedin',
  label: `${strings.appName} on Linkedin`,
  src: `/img/linkedin.svg`,
  href: 'https://www.linkedin.com/company/a11ywatch',
})

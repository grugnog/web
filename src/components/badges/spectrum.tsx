import React from 'react'
import { strings } from '@app-strings'
import { Badge } from './badge'
import { defaultProps } from './defaultProps'
import type { BadgeProps } from './badge-types'

export const SpectrumBadge = (props: BadgeProps) => <Badge {...props} />

SpectrumBadge.defaultProps = {
  ...defaultProps,
  title: 'Spectrum',
  label: `${strings.appName} on Spectrum`,
  src: `/img/spectrum.svg`,
  href: 'https://spectrum.chat/a11ywatch',
}

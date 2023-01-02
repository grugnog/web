import React from 'react'
import { strings } from '@app/content/strings/a11y'
import type { BadgeProps } from './badge-types'
import { GrGithub } from 'react-icons/gr'
import { classNames } from '@app/utils/classes'

export const GithubBadge = (props: Partial<BadgeProps>) => {
  return (
    <a
      aria-label={`${strings.appName} GitHub's organization`}
      href='https://github.com/a11ywatch'
      rel='noreferrer'
      target='_blank'
    >
      <span className='sr-only'>Github Icon</span>
      <GrGithub className={classNames('grIcon', props?.className)} />
    </a>
  )
}

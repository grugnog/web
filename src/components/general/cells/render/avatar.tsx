import React, { memo } from 'react'
import { Tooltip, Avatar } from '@material-ui/core'
import { GrFolder, GrStatusWarning } from 'react-icons/gr'

export function RenderAvatarComponent({
  adaScore,
  cdnConnected,
  error, // issues view
  className = '',
}: any) {
  const newScore = adaScore && `${Math.round(adaScore)}`
  const ADASCORE = adaScore
    ? `Accessibility score ${newScore}`
    : error
    ? ''
    : 'Accessibility score not generated yet'

  const css = `${cdnConnected ? ` ring` : ''} ${className}`

  let inner = <GrFolder />

  if (adaScore) {
    inner = (
      <p
        aria-label={ADASCORE}
        className={`text-black text-sm text-center font-bold`}
      >
        {newScore}
      </p>
    )
  }

  if (error) {
    inner = <GrStatusWarning />
  }

  return (
    <Tooltip
      title={`${ADASCORE} ${cdnConnected ? '- A11yWatch CDN Connected' : ''}`}
      placement={'left'}
    >
      <div className='px-3'>
        <Avatar className={css}>{inner}</Avatar>
      </div>
    </Tooltip>
  )
}

export const RenderAvatar = memo(RenderAvatarComponent)

import { memo } from 'react'
import { GrFolder, GrStatusWarning } from 'react-icons/gr'

export function RenderAvatarComponent({
  accessScore,
  cdnConnected,
  error, // issues view
  className = '',
}: any) {
  const newScore = accessScore && `${Math.round(accessScore)}`
  const ADASCORE = accessScore
    ? `Accessibility score ${newScore}`
    : error
    ? ''
    : 'Accessibility score not generated yet'

  const css = `${cdnConnected ? ` ring` : ''} ${className} p-3 rounded-full`

  let inner = <GrFolder />

  if (accessScore) {
    inner = (
      <p
        aria-label={ADASCORE}
        className={`text-black text-sm text-center font-semibold`}
      >
        {newScore}
      </p>
    )
  }

  if (error) {
    inner = <GrStatusWarning />
  }

  if (cdnConnected) {
    return (
      <div className='px-3'>
        <div className={css}>{inner}</div>
      </div>
    )
  }

  return (
    <div className='px-3'>
      <div className={css}>{inner}</div>
    </div>
  )
}

export const RenderAvatar = memo(RenderAvatarComponent)

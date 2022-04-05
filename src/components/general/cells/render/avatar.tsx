import React, { memo } from 'react'
import { Tooltip, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { GrFolder, GrStatusWarning } from 'react-icons/gr'

const useStyles = makeStyles((theme) => ({
  cdnText: {
    color: theme.palette.secondary.main,
    fontWeight: 800,
  },
  pulse: {
    boxShadow: `2px 1.5px ${theme.palette.secondary.main}`,
    backgroundColor: 'rgb(211,211,211)',
    color: theme.palette.common.black,
  },
}))

export function RenderAvatarComponent({
  adaScore,
  cdnConnected,
  error, // issues view
  className = '',
}: any) {
  const classes = useStyles()

  const newScore = adaScore && `${Math.max(0, adaScore.toFixed(0))}%`
  const ADASCORE = adaScore
    ? `Accessibility score ${newScore}`
    : error
    ? ''
    : 'Accessibility score not generated yet'

  const css = `${cdnConnected ? ` ${classes.pulse}` : ''} ${className}`

  let inner = <GrFolder />

  if (adaScore) {
    inner = (
      <p
        aria-label={ADASCORE}
        className={`text-black text-sm text-center font-bold ${
          cdnConnected ? classes.cdnText : ''
        }`}
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

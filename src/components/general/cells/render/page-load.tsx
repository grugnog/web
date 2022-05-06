import React, { memo } from 'react'
import { Chip, Tooltip } from '@material-ui/core'
import { GrDashboard } from 'react-icons/gr'

interface PageLoad {
  duration: number
  durationFormated: string
  style?: any // root
  chipStyle?: any // icon
}

export function PageLoadComponent({
  duration = 0,
  durationFormated = '',
  style,
  chipStyle,
}: PageLoad) {
  const durationToSeconds = duration / 1000
  const fixedLength =
    String(durationToSeconds).length === 1 ? 1 : durationToSeconds < 1 ? 3 : 2

  if (!duration) {
    return null
  }

  return (
    <Tooltip
      title={`Page load time is ${durationFormated ?? 'N/A'} at ${
        durationToSeconds.toFixed(fixedLength) || 0
      } seconds`}
      placement={'right'}
    >
      <Chip
        style={style}
        size='small'
        avatar={<GrDashboard style={chipStyle} />}
        label={'Speed'}
      />
    </Tooltip>
  )
}

export const PageLoad = memo(PageLoadComponent)

import React, { memo } from 'react'
import { Chip, Tooltip } from '@material-ui/core'
import { GrDashboard } from 'react-icons/gr'

interface PageLoad {
  duration: number
  durationFormated: string
  style?: any
}
export function PageLoadComponent({
  duration = 0,
  durationFormated = '',
  style,
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
        variant='outlined'
        size='small'
        avatar={<GrDashboard style={style} />}
        label={'Speed'}
      />
    </Tooltip>
  )
}

export const PageLoad = memo(PageLoadComponent)

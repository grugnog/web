import { memo } from 'react'
import { Chip } from '@material-ui/core'
import { GrDashboard } from 'react-icons/gr'

interface PageLoad {
  duration: number
  durationFormated: string
  style?: any // root
  chipStyle?: any // icon
}

export function PageLoadComponent({
  duration = 0,
  style,
  chipStyle,
}: PageLoad) {
  if (typeof duration === 'undefined') {
    return null
  }

  const durationToSeconds = duration ? duration / 1000 : 0
  const fixedLength =
    String(durationToSeconds).length === 1 ? 1 : durationToSeconds < 1 ? 3 : 2
  const time = durationToSeconds.toFixed(fixedLength) || 0

  return (
    <Chip
      style={style}
      size='small'
      avatar={<GrDashboard style={chipStyle} className={'grIcon'} />}
      label={`${time}s`}
    />
  )
}

export const PageLoad = memo(PageLoadComponent)

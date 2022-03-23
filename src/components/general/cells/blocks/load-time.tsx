import React, { memo } from 'react'
import { InfoBlock } from '../info-block'

export const LoadTimeBoxWrapper = ({
  durationFormated,
  duration,
}: {
  durationFormated?: string
  duration?: number
}) => {
  return (
    <InfoBlock title={'Page Load Time'}>
      <span>
        {durationFormated || 'N/A'} at <b>{duration ?? 0}ms</b>
      </span>
    </InfoBlock>
  )
}

export const LoadTimeBox = memo(LoadTimeBoxWrapper)

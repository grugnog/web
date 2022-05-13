import React, { memo } from 'react'
import { InfoBlock } from '../info-block'
import { GrTime } from 'react-icons/gr'

export const LoadTimeBoxWrapper = ({ duration }: { duration?: number }) => {
  return (
    <InfoBlock title={'TTL'} icon={<GrTime />}>
      <span>{duration ?? 0}ms</span>
    </InfoBlock>
  )
}

export const LoadTimeBox = memo(LoadTimeBoxWrapper)

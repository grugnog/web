import React from 'react'
import { InfoBlock } from '../info-block'
import { GrTime } from 'react-icons/gr'

export const LoadTimeBox = ({ duration }: { duration?: number }) => {
  return (
    <InfoBlock title={'TTL'} icon={<GrTime />}>
      {duration ?? 0}ms
    </InfoBlock>
  )
}

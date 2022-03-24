import React, { memo } from 'react'
import { InfoBlock } from '../info-block'
import { GrDomain } from 'react-icons/gr'

export const PagesBoxWrapper = ({ count }: { count?: number }) => {
  return (
    <InfoBlock title={'Pages'} icon={<GrDomain />}>
      <p>{count}</p>
    </InfoBlock>
  )
}

export const PagesBox = memo(PagesBoxWrapper)

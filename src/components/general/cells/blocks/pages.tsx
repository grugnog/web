import React, { memo } from 'react'
import { InfoBlock } from '../info-block'

export const PagesBoxWrapper = ({ count }: { count?: number }) => {
  return (
    <InfoBlock title={'Page Count'}>
      <p>{count}</p>
    </InfoBlock>
  )
}

export const PagesBox = memo(PagesBoxWrapper)

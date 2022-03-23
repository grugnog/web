import React, { memo } from 'react'
import { InfoBlock } from '../info-block'

export const OnlineBoxWrapper = ({ online }: { online?: boolean }) => {
  return (
    <InfoBlock title={'Online'}>
      <p>{online ? 'Yes' : 'No'}</p>
    </InfoBlock>
  )
}

export const OnlineBox = memo(OnlineBoxWrapper)

import React, { memo } from 'react'
import { InfoBlock } from '../info-block'
import { VscVmActive } from 'react-icons/vsc'

export const OnlineBoxWrapper = ({ online }: { online?: boolean }) => {
  return (
    <InfoBlock title={'Online'} icon={<VscVmActive />}>
      <p>{online ? 'Yes' : 'No'}</p>
    </InfoBlock>
  )
}

export const OnlineBox = memo(OnlineBoxWrapper)

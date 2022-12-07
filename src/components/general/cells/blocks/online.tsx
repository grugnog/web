import React from 'react'
import { InfoBlock } from '../info-block'
import { VscVmActive } from 'react-icons/vsc'

export const OnlineBox = ({ online }: { online?: boolean }) => {
  return (
    <InfoBlock title={'Online'} icon={<VscVmActive />}>
      {online ? 'Yes' : 'No'}
    </InfoBlock>
  )
}

import React, { memo } from 'react'
import { InfoBlock } from '../info-block'
import { GrUser } from 'react-icons/gr'

export const UserAgentBoxWrapper = ({ ua }: { ua?: string }) => {
  return (
    <InfoBlock title={'UserAgent'} icon={<GrUser />}>
      <p>{ua ? ua : 'SpiderBot'}</p>
    </InfoBlock>
  )
}

export const UserAgentBox = memo(UserAgentBoxWrapper)

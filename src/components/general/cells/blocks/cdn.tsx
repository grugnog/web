import React, { memo } from 'react'
import { InfoBlock } from '../info-block'
import { GrCloudSoftware } from 'react-icons/gr'

export const CDNBoxWrapper = ({ cdnConnected }: { cdnConnected?: boolean }) => {
  return (
    <InfoBlock title={'CDN'} icon={<GrCloudSoftware />}>
      <p>{cdnConnected ? 'Connected' : 'Disconnected'}</p>
    </InfoBlock>
  )
}

export const CDNBox = memo(CDNBoxWrapper)

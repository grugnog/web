import React, { memo } from 'react'
import { InfoBlock } from '../info-block'

export const CDNBoxWrapper = ({ cdnConnected }: { cdnConnected?: boolean }) => {
  return (
    <InfoBlock title={'CDN Connected'}>
      <p>{cdnConnected ? 'Yes' : 'No'}</p>
    </InfoBlock>
  )
}

export const CDNBox = memo(CDNBoxWrapper)

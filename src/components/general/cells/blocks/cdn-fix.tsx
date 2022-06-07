import React, { memo } from 'react'
import { InfoBlock } from '../info-block'
import { GrAidOption } from 'react-icons/gr'

// hard CdnFix that need to be fixed display
export const CdnFixBoxWrapper = ({ issues }: { issues?: number }) => {
  return (
    <InfoBlock
      title={'Patch'}
      icon={<GrAidOption className='grIcon' color='black' fill='black' />}
    >
      <div>
        {issues} possible issue{issues === 1 ? '' : 's'} patched by CDN
      </div>
    </InfoBlock>
  )
}

export const CdnFixBox = memo(CdnFixBoxWrapper)

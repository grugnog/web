import React, { memo } from 'react'
import { InfoBlock } from '../info-block'
import { GrEmergency } from 'react-icons/gr'

// hard errors that need to be fixed display [TODO: Refactor]
export const IssuesBoxWrapper = ({ issues }: { issues?: number }) => {
  return (
    <InfoBlock
      title={'Errors'}
      icon={<GrEmergency className='grIcon' color='black' fill='black' />}
    >
      <div>
        {issues} problem{issues === 1 ? '' : 's'} to fix
      </div>
    </InfoBlock>
  )
}

export const IssuesBox = memo(IssuesBoxWrapper)

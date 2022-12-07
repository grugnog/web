import React from 'react'
import { InfoBlock } from '../info-block'
import { GrAlert } from 'react-icons/gr'

// hard warnings that need to be fixed display
export const WarningsBox = ({ issues }: { issues?: number }) => {
  return (
    <InfoBlock
      title={'Warnings'}
      icon={<GrAlert className='grIcon' color='black' fill='black' />}
    >
      {issues ?? 0} possible issue{issues === 1 ? '' : 's'} to fix
    </InfoBlock>
  )
}

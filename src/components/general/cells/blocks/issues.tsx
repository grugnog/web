import React from 'react'
import { InfoBlock } from '../info-block'
import { GrEmergency } from 'react-icons/gr'

// hard errors that need to be fixed display [TODO: Refactor]
export const IssuesBox = ({ issues }: { issues?: number }) => {
  return (
    <InfoBlock
      title={'Errors'}
      icon={<GrEmergency className='grIcon' color='black' fill='black' />}
    >
      {Intl.NumberFormat().format(issues ?? 0)} issue{issues === 1 ? '' : 's'}{' '}
      to fix
    </InfoBlock>
  )
}

import React from 'react'
import { InfoBlock } from '../info-block'
import { GrAidOption } from 'react-icons/gr'

// hard CdnFix that need to be fixed display
export const CdnFixBox = ({ issues }: { issues?: number }) => {
  return (
    <InfoBlock title={'Automatable'} icon={<GrAidOption className='grIcon' />}>
      {Intl.NumberFormat().format(issues ?? 0)} issue{issues === 1 ? '' : 's'}{' '}
    </InfoBlock>
  )
}

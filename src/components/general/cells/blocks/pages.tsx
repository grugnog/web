import React from 'react'
import { InfoBlock } from '../info-block'
import { GrDomain } from 'react-icons/gr'

export const PagesBox = ({ count }: { count?: number }) => {
  return (
    <InfoBlock title={'Pages'} icon={<GrDomain className='grIcon' />}>
      {count}
    </InfoBlock>
  )
}

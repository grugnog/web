import React from 'react'
import { InfoBlock } from '../info-block'
import { GrFlag } from 'react-icons/gr'

export const HeadersBox = ({ pageHeaders }: { pageHeaders?: boolean }) => {
  return (
    <InfoBlock title={'Headers'} icon={<GrFlag className='grIcon' />}>
      {pageHeaders ? 'Yes' : 'No'}
    </InfoBlock>
  )
}

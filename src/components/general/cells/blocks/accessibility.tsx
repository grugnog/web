import React from 'react'
import { InfoBlock } from '../info-block'
import { GrAccessibility } from 'react-icons/gr'

export const AccessibilityBox = ({
  accessScore = 0,
  average = true,
}: {
  accessScore?: string | number
  average?: boolean
}) => {
  return (
    <InfoBlock title={'Score'} icon={<GrAccessibility className='grIcon' />}>
      {typeof accessScore !== 'undefined' && average ? 'Average ' : ''}{' '}
      {accessScore || 'N/A'}
    </InfoBlock>
  )
}

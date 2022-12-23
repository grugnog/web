import React from 'react'
import { InfoBlock } from '../info-block'
import { GrAccessibility } from 'react-icons/gr'

export const AccessibilityBox = ({
  adaScore = 0,
  average = true,
}: {
  adaScore?: string | number
  average?: boolean
}) => {
  return (
    <InfoBlock title={'Score'} icon={<GrAccessibility />}>
      {typeof adaScore !== 'undefined' && average ? 'Average ' : ''}{' '}
      {adaScore || 'N/A'}
    </InfoBlock>
  )
}

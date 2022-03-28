import React, { memo } from 'react'
import { InfoBlock } from '../info-block'
import { GrAccessibility } from 'react-icons/gr'

export const AccessibilityBoxWrapper = ({
  adaScore,
}: {
  adaScore?: number
}) => {
  return (
    <InfoBlock title={'Score'} icon={<GrAccessibility />}>
      {typeof adaScore === 'number' ? `${Math.round(adaScore)}%` : 'N/A'}
    </InfoBlock>
  )
}

export const AccessibilityBox = memo(AccessibilityBoxWrapper)

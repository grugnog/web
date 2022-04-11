import React, { memo } from 'react'
import { InfoBlock } from '../info-block'
import { GrAccessibility } from 'react-icons/gr'

export const AccessibilityBoxWrapper = ({
  adaScore,
  adaScoreAverage,
}: {
  adaScore?: number
  adaScoreAverage?: number
}) => {
  return (
    <InfoBlock title={'Score'} icon={<GrAccessibility />}>
      {typeof adaScore === 'number'
        ? `${Math.round(adaScore)}${
            adaScoreAverage ? ` avg ${adaScoreAverage}` : ''
          }`
        : 'N/A'}
    </InfoBlock>
  )
}

export const AccessibilityBox = memo(AccessibilityBoxWrapper)

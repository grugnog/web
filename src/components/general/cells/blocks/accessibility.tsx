import React, { memo } from 'react'
import { InfoBlock } from '../info-block'
import { GrAccessibility } from 'react-icons/gr'

export const AccessibilityBoxWrapper = ({
  adaScore,
  average = true,
}: {
  adaScore?: number
  average?: boolean
}) => {
  return (
    <InfoBlock title={'Score'} icon={<GrAccessibility />}>
      {adaScore && average ? 'Average ' : ''} {adaScore || 'N/A'}
    </InfoBlock>
  )
}

export const AccessibilityBox = memo(AccessibilityBoxWrapper)

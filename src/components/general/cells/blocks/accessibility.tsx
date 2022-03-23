import React, { memo } from 'react'
import { InfoBlock } from '../info-block'

export const AccessibilityBoxWrapper = ({
  adaScore,
}: {
  adaScore?: number
}) => {
  return (
    <InfoBlock title={'Accessibility Score'}>
      {adaScore || adaScore === 0 ? `${adaScore}%` : 'N/A'}
    </InfoBlock>
  )
}

export const AccessibilityBox = memo(AccessibilityBoxWrapper)

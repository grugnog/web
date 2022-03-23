import React, { memo } from 'react'
import { InfoBlock } from '../info-block'

export const LighthouseBoxWrapper = ({
  pageInsights,
}: {
  pageInsights?: boolean
}) => {
  return (
    <InfoBlock title={'Lighthouse'}>
      <p>{pageInsights ? 'Yes' : 'No'}</p>
    </InfoBlock>
  )
}

export const LighthouseBox = memo(LighthouseBoxWrapper)

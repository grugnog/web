import React, { memo } from 'react'
import { InfoBlock } from '../info-block'
import { SiLighthouse } from 'react-icons/si'

export const LighthouseBoxWrapper = ({
  pageInsights,
}: {
  pageInsights?: boolean
}) => {
  return (
    <InfoBlock title={'Lighthouse'} icon={<SiLighthouse />}>
      <p>{pageInsights ? 'Enabled' : 'Not Enabled'}</p>
    </InfoBlock>
  )
}

export const LighthouseBox = memo(LighthouseBoxWrapper)

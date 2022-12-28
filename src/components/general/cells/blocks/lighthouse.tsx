import React from 'react'
import { InfoBlock } from '../info-block'
import { SiLighthouse } from 'react-icons/si'

export const LighthouseBox = ({ pageInsights }: { pageInsights?: boolean }) => {
  return (
    <InfoBlock title={'Lighthouse'} icon={<SiLighthouse className='grIcon' />}>
      {pageInsights ? 'Enabled' : 'Not Enabled'}
    </InfoBlock>
  )
}
